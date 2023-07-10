import videoJs from 'video.js';

import { Plugin } from '../../models/plugin.abstract';

import './QualityMenuButton';

import QualityMenuButton from './QualityMenuButton';

import { QualityMenuItem } from './QualityMenuItem';
import { QualityItem } from './models/quality-item.model';

import { QualityProvider } from './providers/quality-provider.interface';
import { DashQualityProvider } from './providers/dash-quality-provider';

import './quality-selector.scss';

type Options = Record<string, never>;

export class QualitySelector extends Plugin<Options> {

  static VERSION = '0.0.0';

  private provider?: QualityProvider;
  private qualityMenuButton?: QualityMenuButton;

  items: QualityMenuItem[] = [];

  onReady() {
    if (this.isUsingTech('dash')) {
      this.provider = new DashQualityProvider(this);
    }

    this.initQualityMenuButton();

    if (this.provider != undefined) {
      this.provider.init();
    }
  }

  initQualityMenuButton() {
    if (this.provider == undefined) { return; }

    this.qualityMenuButton =
      this.player.controlBar.getChild(QualityMenuButton.label) as QualityMenuButton;
  }

  setQuality(value: QualityItem['value']) {
    if (this.provider == undefined) { return; }

    this.provider.changeQuality(value);

    this.renderQualityItems();
  }

  resetQualityItems() {
    this.items = [];
  }

  pushQualityItem(item: QualityItem) {
    const menuItem = new QualityMenuItem(this.player, this, item);

    this.items.push(menuItem);
  }

  renderQualityItems() {
    if (this.provider === undefined) { return; }
    if (this.qualityMenuButton === undefined) { return; }

    this.qualityMenuButton.items = this.items;

    for (const item of this.qualityMenuButton.items) {
      item.selected(item.value === this.provider.currentValue);
    }

    this.qualityMenuButton.update();
    this.qualityMenuButton.show();
  }
}

videoJs.registerPlugin('qualitySelector', QualitySelector);
