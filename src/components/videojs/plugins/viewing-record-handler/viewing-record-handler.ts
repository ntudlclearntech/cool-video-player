import videoJs from 'video.js';
import { VideoJsInstance } from '../../models/videoJs-instance.model';
import { Plugin } from '../../models/plugin.abstract';
import { isValidViewingRecord } from './isValidViewingRecord';
import { ViewingRecord } from './models/viewing-record.model';

type Options = {
  saveInterval: number;
  onSave: (viewingRecord: ViewingRecord) => Promise<void>;
}

export class ViewingRecordHandler extends Plugin<Options> {
  private playbackRate: number;
  private playStartTime: number | undefined;
  private seekStartTime: number | undefined;
  private previousTime: number;
  private currentTime: number;

  constructor(player: VideoJsInstance, options: Options) {
    super(player, videoJs.mergeOptions({}, options));

    this.playbackRate = 0;
    this.playStartTime = undefined;
    this.seekStartTime = undefined;
    this.previousTime = 0;
    this.currentTime = 0;
  }

  onReady() {
    window.addEventListener("beforeunload", this.onBeforeUnload);
    this.player.on("dispose", this.handleDispose);

    this.player.on("track:playing", this.handlePlaying);
    this.player.on("track:pause", this.handlePause);
    this.player.on("track:timeupdate", this.handleTimeUpdate);
    this.player.on("track:seeking", this.handleSeeking);
    this.player.on("track:seeked", this.handleSeeked);
    this.player.on("track:ratechange", this.handleRateChange);
  }

  private handleDispose = () => {
    window.removeEventListener("beforeunload", this.onBeforeUnload);
  }

  private onBeforeUnload = () => {
    if (!this.player.paused()) {
      this.handleCreateViewingRecord({
        start: this.playStartTime,
        end: this.previousTime,
        playbackRate: this.playbackRate,
      });
    }
  }

  private handlePlaying = () => {
    // When network speed is slow,
    //   Youtube video will trigger play event after stopped due to buffering.
    // If there's existing startTime record, don't overwrite it
    if (this.playStartTime === undefined) {
      this.playbackRate = this.player.playbackRate();
      this.playStartTime = this.currentTimeInt();
    }
  }

  private handlePause = () => {

    this.handleCreateViewingRecord({
      start: this.playStartTime,
      end: this.previousTime,
      playbackRate: this.playbackRate,
    });

    this.playbackRate = 0;
    this.playStartTime = undefined;
  }

  private handleRateChange = () => {
    if (!this.player.paused()) {
      const currentTime = this.currentTimeInt();

      this.handleCreateViewingRecord({
        start: this.playStartTime,
        end: currentTime,
        playbackRate: this.playbackRate,
      });

      this.playbackRate = this.player.playbackRate();
      this.playStartTime = currentTime;
    }
  }

  private handleSeeking = () => {
    if (this.seekStartTime === undefined) {
      this.seekStartTime = this.previousTime;
    }
  }

  private handleSeeked = () => {
    this.handleCreateViewingRecord({
      start: this.seekStartTime,
      end: this.currentTimeInt(),
      playbackRate: this.playbackRate,
    });


    this.seekStartTime = undefined;
  }

  private handleTimeUpdate = () => {
    this.previousTime = this.currentTime;
    this.currentTime = this.currentTimeInt();

    if (this.playStartTime !== undefined) {
      if ((this.currentTime - this.playStartTime) >= this.options.saveInterval) {
        this.handleCreateViewingRecord({
          start: this.playStartTime,
          end: this.currentTime,
          playbackRate: this.playbackRate,
        });
        this.playStartTime = this.currentTime;
      }
    }
  }

  private handleCreateViewingRecord(data: Partial<ViewingRecord>) {
    const { start, end, playbackRate } = data;

    if (start === undefined) { return; }
    if (end === undefined) { return; }
    if (playbackRate === undefined) { return; }

    const record = { start, end, playbackRate };

    if (isValidViewingRecord(record)) {
      this.options.onSave(record);
    }
  }

  private currentTimeInt() {
    return Math.trunc(this.player.currentTime());
  }
}

videoJs.registerPlugin('viewingRecordHandler', ViewingRecordHandler);
