import { AbstractQualityProvider } from './quality-provider.abstract';
import { QualitySelector } from '../quality-selector';

import { QualityItem } from '../models/quality-item.model';

import {
  MediaPlayerEvent,
  QualityChangeRenderedPayload,
} from '../../../techs/dash/models/media-player-event.enum';
import { MediaType } from '../../../techs/dash/models/media-type.enum';
import { MediaPlayer } from '../../../techs/dash/models/media-player.model';
import { BitrateInfo } from '../../../techs/dash/models/bitrate-info.model';

const autoQualityItem: QualityItem = {
  label: 'Auto',
  value: 'auto',
}

export class DashQualityProvider extends AbstractQualityProvider {

  private mediaPlayer: MediaPlayer;

  constructor(plugin: QualitySelector) {
    super(plugin);

    this.mediaPlayer = this.plugin.player.dash.mediaPlayer

    this.mediaPlayer.on(
      MediaPlayerEvent.STREAM_ACTIVATED,
      this.init, this,
    );
    this.mediaPlayer.on(
      MediaPlayerEvent.QUALITY_CHANGE_RENDERED,
      this.onQualityChangeRendered, this,
    );
  }

  private onQualityChangeRendered(data: QualityChangeRenderedPayload): void {
    if (this.currentValue === autoQualityItem.value) {
      return;
    }

    this.currentValue = data.newQuality.toString();

    this.plugin.renderQualityItems();
  }

  private makeLabel(bitrateInfo: BitrateInfo): string {
    return `${bitrateInfo.height.toString()}P`
  }

  init() {
    this.plugin.resetQualityItems();

    const bitrateInfos: BitrateInfo[]
      = this.mediaPlayer.getBitrateInfoListFor(MediaType.Video) ?? [];

    bitrateInfos.sort((a, b) => b.qualityIndex - a.qualityIndex)

    for (const bitrateInfo of bitrateInfos) {
      this.plugin.pushQualityItem({
        label: this.makeLabel(bitrateInfo),
        value: bitrateInfo.qualityIndex.toString(),
      });
    }

    this.plugin.pushQualityItem(autoQualityItem);

    this.currentValue = autoQualityItem.value;

    this.setAutoSwitchBitrate(MediaType.Video, true);
    this.setAutoSwitchBitrate(MediaType.Audio, true);

    this.plugin.renderQualityItems();
  }

  changeQuality(value: QualityItem['value']) {
    this.currentValue = value;

    if (value !== autoQualityItem.value) {
      this.setAutoSwitchBitrate(MediaType.Video, false);
      this.mediaPlayer.setQualityFor(MediaType.Video, +value);
    } else {
      this.setAutoSwitchBitrate(MediaType.Video, true);
    }

    this.plugin.renderQualityItems();
  }

  setAutoSwitchBitrate(mediaType: MediaType, value: boolean): void {
    const cfg = {
      streaming: {
        abr: {
          autoSwitchBitrate: {}
        }
      }
    };

    cfg.streaming.abr.autoSwitchBitrate[mediaType] = value;

    this.mediaPlayer.updateSettings(cfg);
  }
}
