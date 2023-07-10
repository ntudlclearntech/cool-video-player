import videoJs from "video.js";

import { Plugin } from "../../models/plugin.abstract";
import { VideoJsInstance } from "../../models/videoJs-instance.model";

import { MediaPlayer } from "../../techs/dash/models/media-player.model";

type RequestModifier = (url: URL) => URL;

type Options = {
  modifier?: RequestModifier;
};

export class DashRequestModifier extends Plugin<Options> {
  static VERSION = "0.0.0";

  private requestModifier: RequestModifier = (url) => url;

  constructor(player: VideoJsInstance, options: Options) {
    super(player, options);

    if (this.options.modifier) {
      this.requestModifier = this.options.modifier;
    }

    /**
     * ref: https://github.com/videojs/videojs-contrib-dash#initialization-hook
     */
    const Html5DashJS = (videoJs as any).Html5DashJS;
    if (Html5DashJS) {
      Html5DashJS.hook(
        "beforeinitialize",
        this.beforeDashMediaPlayerInitialize.bind(this)
      );
    }
  }

  private beforeDashMediaPlayerInitialize(
    _player: VideoJsInstance,
    mediaPlayer: MediaPlayer
  ) {
    /**
     * DashMediaPlayer extend MUST be executed before initialization
     * ref: http://reference.dashif.org/dash.js/nightly/samples/advanced/extend.html
     */
    mediaPlayer.extend("RequestModifier", () => ({
      modifyRequestHeader: (xhr: XMLHttpRequest): XMLHttpRequest => xhr,
      modifyRequestURL: (originalUrl: string): string => {
        let url = new URL(originalUrl);

        url = this.requestModifier(url);

        return url.href;
      },
    }));
  }

  onReady() {
    /* Empty Function */
  }
}

videoJs.registerPlugin("dashRequestModifier", DashRequestModifier);
