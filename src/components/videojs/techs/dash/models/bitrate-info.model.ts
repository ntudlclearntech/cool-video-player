import { MediaType } from "./media-type.enum";

/**
 * ref: https://github.com/Dash-Industry-Forum/dash.js/blob/master/src/streaming/vo/BitrateInfo.js
 */
export type BitrateInfo = {
  bitrate: number,
  width: number,
  height: number,
  mediaType: MediaType,
  qualityIndex: number,
  scanType: string
}
