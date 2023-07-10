import React from 'react';
import ReactDom from 'react-dom';

import videoJs from 'video.js'
import { VideoJsInstance } from 'src/components/videojs/models/videoJs-instance.model';

import { Comment } from './models/comment.model';

import { Comments } from './comments';
import { CommentList } from './CommentList';

import { CommentClickEventName, CommentsToggleEventName } from './comments.constant';

const Component = videoJs.getComponent('Component');

export class CommentsLayer extends Component {
  static label = 'commentsLayer';

  handleClickComment: (comment: Comment) => void;

  constructor(player: VideoJsInstance, options: any) {
    super(player, videoJs.mergeOptions({}, options));

    this.on(CommentsToggleEventName, (event: unknown, data: { show: boolean }) => {
      data.show ? this.show() : this.hide();
    });
  }

  render() {
    const plugin = (this.player() as VideoJsInstance).comments() as Comments;

    const currentTime = this.player().currentTime();

    const handleClickComment = (comment: Comment) => {
      this.trigger(CommentClickEventName, { comment });
    }

    ReactDom.render(
      React.createElement(CommentList, {
        comments: plugin.comments.filter(c => {
          return currentTime - 3 <= c.videoTime && c.videoTime <= currentTime;
        }),
        onClickComment: handleClickComment,
      }),
      this.el(),
    );

    return;
  }
}

Component.registerComponent(CommentsLayer.label, CommentsLayer);
