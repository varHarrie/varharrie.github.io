import * as React from 'preact'

import Comment from './components/Comment'
import Loader from './components/Loader'
import {IArticle, IComment} from './interfaces'
import * as dateUtil from './libs/dateUtil'
import * as githubApis from './libs/githubApis'

export interface IArticleProps {
  path?: string
  url?: string
  number?: string
  matches?: {
    number: string
  }
}

export interface IArticleState {
  article: IArticle | null
  comments: IComment[]
}

export default class Article extends React.Component<IArticleProps, IArticleState> {

  constructor (props: IArticleProps) {
    super(props)
    this.state = {
      article: null,
      comments: []
    }
  }

  componentDidMount () {
    this.load(parseInt(this.props.number || ''))
  }

  load (number: number) {
    githubApis.getIssue(number)
      .then((body) => {
        this.setState({
          article: body
        })
      })
      .then(() => {
        githubApis.listComments(number).then((body) => {
          this.setState({
            comments: body
          })
        })
      })
  }

  render (props: IArticleProps, {article, comments}: IArticleState) {
    if (!article) {
      return <Loader/>
    }

    return (
      <div className='Article'>
        <div className='Article__header'>
          <h1 className='Article__title'>
            {article.title}
          </h1>
          <div className='Article__details'>
            <span className='Article__date'>{dateUtil.format(article.created_at, 'DD / MM / YYYY')}</span>
            <span className='Article__tags'>
              {article.labels.map((label) => (
                <span className='Article__tag'>{label.name}</span>
              ))}
            </span>
            <span className='Article__comments'>评论&nbsp;{article.comments}</span>
          </div>
        </div>
        <div className='Article__body'>
          <div className='Article__content markdown-body' dangerouslySetInnerHTML={{__html: article.body_html}}/>
        </div>
        <div className='Article__footer'>
          <a href={`${article.html_url}#partial-timeline-marker`}>
            <div className='Article__reply'>点击评论</div>
          </a>
          {comments.map((comment) => (
            <Comment comment={comment}/>
          ))}
        </div>
      </div>
    )
  }
}
