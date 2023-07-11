# cool-video-player

## requirements

- "node": "~16.18.1"
- "npm": "~8.19.4"

## Installation

1. `npm clean-install`

## Development

1. `npm run start` for Runs the app in development mode.

## videojs plugins (src/components/videojs/plugins)

1. comments/
    * Display the contents of the comment at the specified time in the video.
    * It can be turned on and off by the button in the video control bar.
1. dash-request-modifier/
    * Use to dynamically modify the dash controller's request.
1. event-tracking/
    * Standardize the differences between each play tech for each event.
    * For example, at the end of the video, will be trigger 'ended' + 'pause' events, but youtube tech will only trigger 'ended' events.
1. hotkeys/
    * Setup player key shortcuts
    * Modified from https://github.com/ctd1500/videojs-hotkeys 
1. last-play-handler/
    * Record and set the time point of the last playback.
1. markers/
    * Displays the time markers of the comment on the duration bar.
1. quality-selector/
    * Customized video quality selection menu
1. seek-buttons/
    * Forward and Backward buttons on the control bar
    * Modified from https://github.com/mister-ben/videojs-seek-buttons
1. viewing-record-handler/
    * Record completion rate of video viewings

## Notes

1. All `// [ACTION]` comments represent hidden business logic.
