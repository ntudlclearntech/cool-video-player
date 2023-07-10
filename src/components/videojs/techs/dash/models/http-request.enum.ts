import { MediaType } from "./media-type.enum";
import { BitrateInfo } from "./bitrate-info.model";

/**
 * ref:
 * 1. http://cdn.dashjs.org/latest/jsdoc/streaming_vo_metrics_HTTPRequest.js.html
 */
export enum HTTPRequest {
  GET = 'GET',
  HEAD = 'HEAD',
  MPD_TYPE = 'MPD',
  XLINK_EXPANSION_TYPE = 'XLinkExpansion',
  INIT_SEGMENT_TYPE = 'InitializationSegment',
  INDEX_SEGMENT_TYPE = 'IndexSegment',
  MEDIA_SEGMENT_TYPE = 'MediaSegment',
  BITSTREAM_SWITCHING_SEGMENT_TYPE = 'BitstreamSwitchingSegment',
  MSS_FRAGMENT_INFO_SEGMENT_TYPE = 'FragmentInfoSegment',
  LICENSE = 'license',
  OTHER_TYPE = 'other',
}
