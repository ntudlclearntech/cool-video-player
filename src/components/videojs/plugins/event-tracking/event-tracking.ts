import videoJs from 'video.js';

import { Plugin } from '../../models/plugin.abstract';

import { trackingEnded } from './events/trackingEnded';
import { trackingPause } from './events/trackingPause';
import { trackingPlaying } from './events/trackingPlaying';
import { trackingRatechange } from './events/trackingRatechange';
import { trackingSeeked } from './events/trackingSeeked';
import { trackingSeeking } from './events/trackingSeeking';
import { trackingTimeupdate } from './events/trackingTimeupdate';

type Options = {
  skipFirstSeeked: boolean;
}

export class EventTracking extends Plugin<Options> {

  static VERSION = '0.0.0';

  onReady() {
    trackingRatechange.apply(this);
    trackingPlaying.apply(this);
    trackingPause.apply(this);
    trackingEnded.apply(this);
    trackingSeeking.apply(this);
    trackingSeeked.apply(this);
    trackingTimeupdate.apply(this);
  }
}

videoJs.registerPlugin('eventTracking', EventTracking);
