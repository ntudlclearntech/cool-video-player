import { EventTracking } from '../event-tracking';

export function trackingPlaying(this: EventTracking) {

  this.player.on("playing", () => {
    this.player.trigger("track:playing");
  });

  
}
