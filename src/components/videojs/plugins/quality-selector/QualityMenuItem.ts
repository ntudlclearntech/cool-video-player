import videoJs from 'video.js';
import { VideoJsInstance } from '../../models/videoJs-instance.model';

import { QualityItem } from './models/quality-item.model';
import { QualitySelector } from './quality-selector';

const VideoJsMenuItem = videoJs.getComponent('MenuItem');

export class QualityMenuItem extends VideoJsMenuItem {

  private plugin: QualitySelector;

  label: string;
  value: string;

  constructor(
    player: VideoJsInstance,
    plugin: QualitySelector,
    item: QualityItem,
  ) {

    super(player, {
      label: item.label,
      selectable: true,
      selected: false
    });

    this.plugin = plugin;

    this.label = item.label;
    this.value = item.value;
  }

  handleClick() {
    this.plugin.setQuality(this.value);
  }
}
