import { EventTracking } from '../event-tracking';

export function trackingSeeked(this: EventTracking) {

  this.player.one("seeked", () => {
    // ensuring exactly first seeked event is ignored
    if (!this.options.skipFirstSeeked) {
      this.player.trigger("track:seeked");
    }

    this.player.on("seeked", () => {
      this.player.trigger("track:seeked");
    });
  });
}
