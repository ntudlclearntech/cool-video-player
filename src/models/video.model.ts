import { VideoType } from "src/models/video-type.enum";

export type Video = {
  videoType: VideoType;
  thumbnailPath: string;
  sourceUri: string;
  altSourceUri?: string;
  lastPlay?: number;
};
