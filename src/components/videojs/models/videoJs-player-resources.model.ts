import videoJs from 'video.js';

type Mp4Resource = videoJs.Tech.SourceObject & {
  type: 'video/mp4';
  label?: string
};

type DashResource = videoJs.Tech.SourceObject & {
  type: 'application/dash+xml';
};

type YoutubeResource = videoJs.Tech.SourceObject & {
  type: 'video/youtube';
};

export type VideoJsPlayerResources = {
  sources?: (Mp4Resource | DashResource | YoutubeResource)[];
  poster?: string;
}
