import { Video } from "src/models/video.model";
import { VideoType } from "src/models/video-type.enum";

import { VideoJsPlayerResources } from "src/components/videojs/models/videoJs-player-resources.model";
import { VideoJsPlayerOptions } from "src/components/videojs/models/videoJs-player-options.model";
import { VideoJsBasicPlugin } from "src/components/videojs/models/videoJs-plugin.model";

import { ViewingRecord } from "src/components/videojs/plugins/viewing-record-handler";
import { HTTPRequest } from "src/components/videojs/techs/dash/models/http-request.enum";

interface Window {
  MediaSource?: any;
  WebKitMediaSource?: any;
  SourceBuffer?: any;
  WebKitSourceBuffer?: any;
}
declare const window: Window;

enum SourceType {
  Html5Mp4 = 'html5/mp4',
  Html5Dash = 'html5/dash',
  Youtube = 'youtube',
}

// ref: https://github.com/epiclabs-io/browser-media-support/blob/master/src/app/mse/mse.service.ts#L62
function isMseSupported(): boolean {
  const mediaSource = (window.MediaSource =
    window.MediaSource || window.WebKitMediaSource);
  const sourceBuffer = (window.SourceBuffer =
    window.SourceBuffer || window.WebKitSourceBuffer);
  return mediaSource && typeof mediaSource.isTypeSupported === 'function';
}

function getSourceType(video: Video): SourceType {
  switch (video.videoType) {
    case VideoType.UserUploaded: {
      const { pathname } = new URL(video.sourceUri);

      return pathname.endsWith('.mpd') && isMseSupported()
        ? SourceType.Html5Dash
        : SourceType.Html5Mp4;
    }
    case VideoType.Youtube: {
      return SourceType.Youtube;
    }
  }
}

export class VideoJsBuilder {
  static createPlayerResource(
    video: Video
  ): VideoJsPlayerResources {
    const resources: VideoJsPlayerResources = {
      sources: [],
      poster: undefined,
    };

    switch (getSourceType(video)) {
      case SourceType.Html5Mp4: {
        const { pathname } = new URL(video.sourceUri);

        resources.sources!.push({
          src: pathname.endsWith('.mpd') ? video.altSourceUri || '' : video.sourceUri,
          type: 'video/mp4',
        });
        resources.poster = video.thumbnailPath;
        break;
      }
      case SourceType.Html5Dash: {
        resources.sources!.push({
          src: video.sourceUri,
          type: 'application/dash+xml',
        });
        resources.poster = video.thumbnailPath;
        break;
      }
      case SourceType.Youtube: {
        resources.sources!.push({
          src: video.sourceUri,
          type: 'video/youtube',
        });
        break;
      }
    }

    return resources;
  }

  static createPlayerOptions(video: Video): VideoJsPlayerOptions {

    const options: VideoJsPlayerOptions = {
      controls: true,
      preload: "metadata",
      controlBar: {
        children: [
          // play toggle control
          { name: 'playToggle' },
          // time display
          { name: 'currentTimeDisplay' },
          { name: 'timeDivider' },
          { name: 'durationDisplay' },
          // progress control
          { name: 'progressControl' },
          // volume control
          { name: 'volumePanel', inline: false },
          // playback rate control
          { name: 'playbackRateMenuButton' },
          // toggle comments control
          { name: 'toggleCommentsButton' },
          // quality control
          { name: 'qualityMenuButton' },
          // fullscreen toggle control
          { name: 'fullscreenToggle' },
        ],
      },
    };

    switch (getSourceType(video)) {
      case SourceType.Html5Mp4:
        options.playbackRates = [0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];
        break;
      case SourceType.Html5Dash:
        options.playbackRates = [0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];
        options.html5 = {
          dash: {
            updateSettings: [
              {
                streaming: {
                  retryIntervals: {
                    [HTTPRequest.MPD_TYPE]: 500,
                    [HTTPRequest.MEDIA_SEGMENT_TYPE]: 1000,
                    [HTTPRequest.INIT_SEGMENT_TYPE]: 1000,
                    [HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE]: 1000,
                    [HTTPRequest.INDEX_SEGMENT_TYPE]: 1000,
                  },
                  retryAttempts: {
                    [HTTPRequest.MPD_TYPE]: 3,
                    [HTTPRequest.MEDIA_SEGMENT_TYPE]: 3,
                    [HTTPRequest.INIT_SEGMENT_TYPE]: 3,
                    [HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE]: 3,
                    [HTTPRequest.INDEX_SEGMENT_TYPE]: 3,
                  },
                },
              },
            ],
          },
        };
        break;
      case SourceType.Youtube:
        options.playbackRates = [0.75, 1, 1.25, 1.5, 1.75, 2];
        break;
    }

    return options;
  }

  static createPluginsOptions(
    video: Video
  ): VideoJsBasicPlugin[] {
    const pluginsOptions: VideoJsBasicPlugin[] = [
      {
        name: 'hotkeys',
        options: {
          volumeStep: 0.1,
          seekStep: 5,
          enableModifiersForNumbers: false,
        },
      },
      {
        name: 'seekButtons',
        options: {
          forward: 5,
          back: 5    
        },
      },
      {
        name: 'qualitySelector',
        options: {},
      },
      {
        name: 'eventTracking',
        options: {
          skipFirstSeeked: !!video.lastPlay,
        },
      },
      {
        name: 'lastPlayHandler',
        options: {
          lastPlay: video.lastPlay,
          updateInterval: 30, // unit: seconds
          onUpdate: async (lastPlay: number) => {
            console.log(`lastPlay: ${lastPlay}`)
            // [ACTION] send api to backend for storing last play.
          },
        },
      },
      {
        name: 'viewingRecordHandler',
        options: {
          saveInterval: 60, // unit: seconds
          onSave: async (viewingRecord: ViewingRecord) => {
            console.log(`viewingRecord: ${JSON.stringify(viewingRecord)}`)
            // [ACTION] send api to backend for storing viewing record.
          },
        },
      },
    ];

    if (getSourceType(video) === SourceType.Html5Dash) {
      pluginsOptions.push({
        name: 'dashRequestModifier',
        options: {
          modifier: (url: URL): URL => {
            const targetUrl = new URL(url.href);

            // [ACTION] modify request, like add user analyze id to query string

            return targetUrl;
          },
        },
      });
    }

    return pluginsOptions;
  }
}
