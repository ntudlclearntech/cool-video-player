import React, { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';

import { VideoJsPlayer } from '../videojs/VideoJsPlayer';
import { VideoJsInstance } from '../videojs/models/videoJs-instance.model';

import { Video } from 'src/models/video.model';
import { Comment } from 'src/models/comment.model';
import {
  Comment as PlayerComment
} from '../videojs/plugins/comments/models/comment.model';

import { VideoJsBuilder } from './utils/videojs.builder';
import { MarkerUtils } from './utils/marker.utils';

import '../videojs/techs/dash';
import '../videojs/techs/youtube';

import '../videojs/plugins/hotkeys';
import '../videojs/plugins/markers';
import '../videojs/plugins/seek-buttons';
import '../videojs/plugins/comments';
import '../videojs/plugins/quality-selector';
import '../videojs/plugins/last-play-handler';
import '../videojs/plugins/viewing-record-handler';
import '../videojs/plugins/dash-request-modifier';
import '../videojs/plugins/event-tracking';

import './VideoPlayer.scss';

import {
  CommentClickEventName,
  CommentsToggleEventName,
} from '../videojs/plugins/comments/comments.constant';

type PlayerProps = {
  video?: Video;
  comments: Comment[];
};

export const VideoPlayer: FunctionComponent<PlayerProps> = (props: PlayerProps) => {
  const [player, setPlayer] = useState<VideoJsInstance | undefined>(undefined);

  const [showComment, setShowComment] = useState(true);
  const [hasVideoMetadata, setHasVideoMetadata] = useState(false);

  const { video, comments } = props;

  useEffect(() => {
    if (player && comments && hasVideoMetadata) {
      // markers will not have correct position until we have video duration loaded
      player.markers.reset(MarkerUtils.createMarkers(comments, showComment));
    }
  }, [player, hasVideoMetadata, comments, showComment]);

  useEffect(() => {
    if (player && comments) {
      player.comments().setOptions({ comments });
    }
  }, [player, comments]);

  const renderPlayer = () => {

    const resources = VideoJsBuilder.createPlayerResource(video!);
    const options = VideoJsBuilder.createPlayerOptions(video!);
    const plugins = VideoJsBuilder.createPluginsOptions(video!);

    return <VideoJsPlayer
      className={
        [
          'vjs-default-skin',
          'vjs-big-play-centered',
          'vjs-has-not-started',
          'cool-video-layout',
        ].join(' ')
      }

      resources={resources}
      options={options}
      plugins={plugins}

      onReady={(playerInstance) => {
        if (playerInstance) {
          // vjs-has-not-started is added on our own, not handled by videojs
          // so we need to remove it manually
          playerInstance.on("play", () => {
            if (playerInstance.hasClass('vjs-has-not-started')) {
              playerInstance.removeClass('vjs-has-not-started');
            }
          });

          // Add comment markers
          playerInstance.markers(MarkerUtils.createOptions());
          playerInstance.on('loadedmetadata', () => {
            setHasVideoMetadata(true); // This shall trigger markers reset effect
          });

          const commentsPlugin = playerInstance.comments({});

          // Set show comments button on video player control bar
          commentsPlugin.on(
            CommentsToggleEventName,
            (event: unknown, data: { show: boolean }) => {
              setShowComment(data.show);
            },
          );

          commentsPlugin.on(
            CommentClickEventName,
            (event: unknown, data: { comment: PlayerComment }) => {
              playerInstance.pause();

              // [ACTION] Jump to comment page to show full comment content.
            },
          );
        }

        setPlayer(playerInstance);
      }}
    />
  }

  return video !== undefined
    ? renderPlayer()
    : <div className='cool-video-layout'></div>;
}
