import videoJs from 'video.js';

import { VideoJsInstance } from './videoJs-instance.model';

const VideoJsPlugin = videoJs.getPlugin('plugin');

export abstract class Plugin<T> extends VideoJsPlugin {

  public player: VideoJsInstance;
  public options: T;

  constructor(
    player: VideoJsInstance,
    options: T,
  ) {
    super(player);

    this.player = player;
    this.options = options;

    this.onInit();

    this.player.on('ready', this.onReady.bind(this));
  }

  abstract onReady(): void;

  onInit(): void {
    // empty function for optional hook
  }

  /**
   *
   * @param name html5 | dash | youtube
   * @returns
   */
  isUsingTech(name: string): boolean {
    const tech = this.getTech();

    if (name === 'html5') {
      return tech.sourceHandler_ === undefined;
    }

    if (name === 'dash') {
      return tech.sourceHandler_ instanceof (videoJs as any).Html5DashJS;
    }

    if (name === 'youtube') {
      return !!tech['ytPlayer'];
    }

    return tech.name() === name;
  }

  getTech() {
    return this.player.tech({ IWillNotUseThisInPlugins: true });
  }
}
