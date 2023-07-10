import { EventTracking } from '../event-tracking';

export function trackingTimeupdate(this: EventTracking) {

  this.player.on("timeupdate", () => {
    // If it's youtube video,
    // the timeupdate event will continue to trigger after the ended
    if (this.player.ended()) { return; }

    // when scrubbing,
    // the timeupdate event will continue to trigger until the scrubbed
    if (this.player.scrubbing()) { return; }


    this.player.trigger("track:timeupdate");
  });
}
