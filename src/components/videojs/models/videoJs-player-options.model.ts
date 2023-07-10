import videoJs from 'video.js';

export type VideoJsPlayerOptions = {
  aspectRatio?: string;
  autoplay?: 'muted' | 'play' | 'any';
  bigPlayButton?: boolean;
  controlBar?: any;
  textTrackSettings?: videoJs.TextTrackSettingsOptions;
  controls?: boolean;
  defaultVolume?: number;
  fluid?: boolean;
  height?: number;
  html5?: any;
  inactivityTimeout?: number;
  language?: string;
  languages?: { [code: string]: videoJs.LanguageTranslations };
  loop?: boolean;
  muted?: boolean;
  nativeControlsForTouch?: boolean;
  notSupportedMessage?: string;
  playbackRates?: number[];
  preload?: 'auto' | 'metadata' | 'none';
  sourceOrder?: boolean;
  sources?: videoJs.Tech.SourceObject[];
  techOrder?: string[];
  tracks?: videoJs.TextTrackOptions[];
  userActions?: videoJs.UserActions;
  width?: number;
}
