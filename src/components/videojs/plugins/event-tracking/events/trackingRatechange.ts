import { EventTracking } from '../event-tracking';

export function trackingRatechange(this: EventTracking) {

  this.player.on("ratechange", () => {
    this.player.trigger("track:ratechange");
  });
}
