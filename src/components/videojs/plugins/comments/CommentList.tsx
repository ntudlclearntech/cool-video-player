import React, { FunctionComponent } from 'react';

import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import { Comment } from './models/comment.model';

import styles from './CommentList.module.scss';

type CommentListComponentProps = {
  comments: Comment[];
  onClickComment: (comment: Comment) => void;
};

export const CommentList: FunctionComponent<CommentListComponentProps>
  = (props: CommentListComponentProps) => {
    const { comments, onClickComment } = props;

    const handleClickComment = (event: React.MouseEvent, comment: Comment) => {
      event.nativeEvent.stopImmediatePropagation();

      onClickComment(comment);
    };

    const renderCommentCard = (comment: Comment) => {
      return (
        <div
          className={`${styles['vjs-comments']}`}
          onClick={event => handleClickComment(event, comment)}
        >
          <strong>{comment.username}</strong>
          <span className={`${styles['three-lines-ellipsis']}`} >
            {comment.content}
          </span>
        </div>
      );
    };

    return (
      <div className={`${styles['vjs-comments-list']}`}>
        <TransitionGroup>
          {
            comments.map(comment => {
              return (
                <CSSTransition
                  key={comment.id}
                  classNames={styles['vjs-comments-list']}
                  timeout={{ enter: 500, exit: 500 }}
                >
                  {renderCommentCard(comment)}
                </CSSTransition>
              );
            })
          }
        </TransitionGroup>
      </div>
    );
  };
