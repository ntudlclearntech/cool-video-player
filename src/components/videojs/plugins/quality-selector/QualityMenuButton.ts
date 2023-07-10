import videoJs from 'video.js';
import { VideoJsInstance } from '../../models/videoJs-instance.model';

import { QualityMenuItem } from './QualityMenuItem';

const VideoJsMenuButton = videoJs.getComponent('MenuButton');
const VideoJsComponent = videoJs.getComponent('Component');

export default class QualityMenuButton extends VideoJsMenuButton {
  static label = 'qualityMenuButton';

  options_: any = {};

  items: QualityMenuItem[] = [];

  constructor(player: VideoJsInstance, options: any) {
    super(player, { ...options });

    this.addClass('vjs-quality-selector');

    this.menuButton_.$('.vjs-icon-placeholder').classList.add('vjs-icon-cog');

    this.hide();
  }

  createItems() {
    return this.items;
  }
}

VideoJsComponent.registerComponent(QualityMenuButton.label, QualityMenuButton);
