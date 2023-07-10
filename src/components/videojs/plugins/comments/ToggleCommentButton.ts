import videoJs from 'video.js'

import { CommentsToggleEventName } from './comments.constant';

const Button = videoJs.getComponent('Button');
const Component = videoJs.getComponent('Component');

export class ToggleCommentsButton extends Button {
  static label = 'toggleCommentsButton';

  buildCSSClass() {
    return `vjs-toggle-comments-button show-comments ${super.buildCSSClass()}`;
  }

  handleClick() {
    const isShowComment = this.hasClass('show-comments');

    if (isShowComment) {
      this.removeClass('show-comments');
      this.addClass('hide-comments');

      this.trigger(CommentsToggleEventName, { show: !isShowComment });
    } else {
      this.removeClass('hide-comments');
      this.addClass('show-comments');

      this.trigger(CommentsToggleEventName, { show: !isShowComment });
    }
  }
}

Component.registerComponent(ToggleCommentsButton.label, ToggleCommentsButton);
