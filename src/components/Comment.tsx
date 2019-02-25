import * as React from 'preact'

import {IComment} from '../interfaces'
import * as dateUtil from '../libs/dateUtil'

export interface ICommentProps {
  comment: IComment
}

export interface ICommentState {}

export default class Comment extends React.Component<ICommentProps, ICommentState> {
  render ({comment}: ICommentProps) {
    return (
      <div className='Comment'>
        <div className='Comment__header'>
          <div className='Comment__avatar'>
            <img src={comment.user.avatar_url}/>
          </div>
          <div className='Comment__user'>{comment.user.login}{comment.author_association === 'OWNER' && <span>作者</span>}</div>
          <div className='Comment__date'>{dateUtil.format(comment.created_at, 'YYYY-MM-DD HH:mm:ss')}</div>
        </div>
        <div className='Comment__body'>
          <div className='Comment__content markdown-body' dangerouslySetInnerHTML={{__html: comment.body_html}}/>
        </div>
      </div>
    )
  }
}
