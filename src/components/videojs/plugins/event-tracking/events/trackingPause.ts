import { EventTracking } from '../event-tracking';

export function trackingPause(this: EventTracking) {

  this.player.on("pause", () => {
    this.player.trigger("track:pause");
  });

  this.player.on("ended", () => {
    // When youtube video ends, only ended event will be triggered
    // so we need to manually trigger pause event handler
    if (this.isUsingTech("youtube")) {
      this.player.trigger("track:pause");
    }
  });
}
