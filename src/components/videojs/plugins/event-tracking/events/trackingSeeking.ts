import { EventTracking } from '../event-tracking';

export function trackingSeeking(this: EventTracking) {

  this.player.on("seeking", () => {
    this.player.trigger("track:seeking");
  });
}
