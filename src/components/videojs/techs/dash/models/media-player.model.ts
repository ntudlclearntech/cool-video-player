import { BitrateInfo } from "./bitrate-info.model";
import { MediaPlayerEvent } from "./media-player-event.enum";
import { MediaType } from "./media-type.enum";

/**
 * NOTE: Not all, only the parts that are used by this project.
 *
 * ref: http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html
 */
export type MediaPlayer = {

  extend: (
    parentNameString: string,
    childInstance: any,
    override?: boolean,
  ) => void

  getBitrateInfoListFor: (
    type: MediaType,
  ) => BitrateInfo[],

  on: (
    type: MediaPlayerEvent,
    listener: (event: any) => void,
    scope?: any,
    options?: any,
  ) => BitrateInfo[],

  setQualityFor: (
    type: MediaType,
    value: BitrateInfo['qualityIndex'],
    forceReplace?: boolean,
  ) => void,

  updateSettings: (
    settings: any,
  ) => void,
}
