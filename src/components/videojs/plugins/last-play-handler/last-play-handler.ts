import videoJs from 'video.js';

import { Plugin } from '../../models/plugin.abstract';

type Options = {
  lastPlay?: number;
  updateInterval: number;
  onUpdate: (lastPlay: number) => void | Promise<void>;
};

export class LastPlayHandler extends Plugin<Options> {

  static VERSION = '0.0.0';

  private playStartTime: number | undefined;

  onReady() {
    this.player.on('track:playing', this.handlePlaying);
    this.player.on('track:pause', this.handlePause);
    this.player.on('track:timeupdate', this.handleTimeUpdate);
    this.player.on("track:seeked", this.handleSeeked);
    this.player.on('track:ended', this.handleEnded);

    this.playStartTime = undefined;

    if (this.options.lastPlay) {
      this.player.currentTime(this.options.lastPlay);
    }
  }

  private handlePlaying = () => {
    // When network speed is slow,
    //   Youtube video will trigger play event after stopped due to buffering.
    // If there's existing startTime record, don't overwrite it
    if (this.playStartTime === undefined) {
      this.playStartTime = this.currentTimeInt();
    }
  }

  private handlePause = () => {
    if (this.player.seeking()) { return; }

    this.updateLastPlay(this.currentTimeInt());

    this.playStartTime = undefined;
  }

  private handleTimeUpdate = () => {
    if (this.player.seeking()) { return; }

    const currentTime = this.currentTimeInt();

    if (this.playStartTime !== undefined) {
      if ((currentTime - this.playStartTime) >= this.options.updateInterval) {
        this.updateLastPlay(currentTime);

        this.playStartTime = currentTime;
      }
    }
  }

  private handleSeeked = () => {
    const currentTime = this.currentTimeInt();

    this.updateLastPlay(currentTime);

    this.playStartTime = currentTime;
  }

  private handleEnded = () => {
    this.updateLastPlay(0);
  }

  private updateLastPlay = (lastPlay: number) => {
    this.options.onUpdate(lastPlay);
  }

  private currentTimeInt() {
    return Math.trunc(this.player.currentTime());
  }
}

videoJs.registerPlugin('lastPlayHandler', LastPlayHandler);
