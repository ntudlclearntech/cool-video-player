import { VideoJsPlayer as RawVideoJsPlayer } from 'video.js';
import { VideoJsTechs } from './videoJs-techs.models';

export interface VideoJsInstance extends RawVideoJsPlayer {
  [key: string]: any;

  tech(safety?: any): VideoJsTechs;
}
