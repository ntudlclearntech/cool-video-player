import { Comment } from '../../videojs/plugins/comments/models/comment.model';

export type Marker = {
  time: number,
  duration?: number,
  text?: string,
  class?: string,
  overlayText?: string,
};

export class MarkerUtils {

  static createMarkers(comments: Comment[], showComment: boolean): Marker[] {
    return comments.map(comment => { return { time: comment.videoTime, class: showComment ? "" : "d-none" } });
  }

  static createOptions() {
    return {
      markers: [],
      markerTip: {
        display: false
      },
      markerStyle: {
        'width': '12px',
        'border-radius': '50%',
        'border': '1px solid #FFFFFF',
        'background-color': 'rgba(59, 158, 234, 1)',
        'height': '12px',
        'bottom': 'unset',
        'top': '-6px',
      },
    }
  }
}
