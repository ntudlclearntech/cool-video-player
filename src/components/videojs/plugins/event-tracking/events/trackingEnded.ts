import { EventTracking } from '../event-tracking';

export function trackingEnded(this: EventTracking) {

  this.player.on("ended", () => {
    this.player.trigger("track:ended");
  });
}
