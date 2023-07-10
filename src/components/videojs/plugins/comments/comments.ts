import videoJs from 'video.js';
import { VideoJsInstance } from '../../models/videoJs-instance.model';

import { Plugin } from '../../models/plugin.abstract';

import { Comment } from './models/comment.model';

import { CommentsLayer } from './CommentsLayer';
import { ToggleCommentsButton } from "./ToggleCommentButton";

import "./ToggleCommentButton.scss";

import { CommentClickEventName, CommentsToggleEventName } from './comments.constant';

type Options = {
  comments?: Comment[];
};

export class Comments extends Plugin<Options> {

  static VERSION = '0.0.0';

  comments: Comment[];

  private layer: CommentsLayer;
  private button: ToggleCommentsButton;

  constructor(player: VideoJsInstance, options: any) {
    super(player, videoJs.mergeOptions({}, options));

    this.comments = this.options.comments ?? [];
  }

  setOptions(options: Options) {
    this.comments = options.comments ?? [];
  }

  onInit() {
    this.player.addChild(CommentsLayer.label);
  }

  onReady() {
    this.layer = this.player
      .getChild(CommentsLayer.label) as CommentsLayer;

    this.button = this.player
      .getChild('controlBar')!
      .getChild(ToggleCommentsButton.label)! as ToggleCommentsButton;

    // Update video player comment list by time
    this.player.on('timeupdate', () => {
      this.layer.render();
    });

    this.button.on(
      CommentsToggleEventName,
      (event: unknown, data: { show: boolean }) => {
        this.trigger(CommentsToggleEventName, data);
        this.layer.trigger(CommentsToggleEventName, data);
      },
    );

    this.layer.on(
      CommentClickEventName,
      (event: unknown, data: { comment: Comment }) => {
        this.trigger(CommentClickEventName, data);
      },
    );
  }
}

videoJs.registerPlugin('comments', Comments);
