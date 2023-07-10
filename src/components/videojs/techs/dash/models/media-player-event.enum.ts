import { MediaType } from "./media-type.enum";
import { BitrateInfo } from "./bitrate-info.model";

/**
 * NOTE: Not all, only the parts that are used by this project.
 *
 * ref:
 * 1. http://cdn.dashjs.org/latest/jsdoc/MediaPlayerEvents.html
 * 2. http://cdn.dashjs.org/latest/jsdoc/streaming_MediaPlayerEvents.js.html
 */
export enum MediaPlayerEvent {
  STREAM_ACTIVATED = 'streamActivated',
  QUALITY_CHANGE_RENDERED = 'qualityChangeRendered',
}

export type QualityChangeRenderedPayload = {
  mediaType: MediaType,
  newQuality: BitrateInfo['qualityIndex'],
  oldQuality: BitrateInfo['qualityIndex'],
}
