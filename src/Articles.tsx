import * as React from 'preact'

import {IArticle} from './interfaces'
import * as dateUtil from './libs/dateUtil'
import * as githubApis from './libs/githubApis'
import Loader from './components/Loader';
import Pagination from './components/Pagination';
import config from './config';

export interface IArticlesProps {
  page?: string
}

export interface IArticlesState {
  loading: boolean
  total: number
  page: number
  articles: IArticle[]
}

export default class Articles extends React.Component<IArticlesProps, IArticlesState> {

  constructor (props: IArticlesProps) {
    super(props)

    this.state = {
      loading: true,
      total: -1,
      page: 0,
      articles: []
    }
  }

  componentDidMount () {
    const page = parseInt(this.props.page as any) || 1
    this.load(page)
  }

  componentWillReceiveProps(nextProps: IArticlesProps) {
    const page = parseInt(nextProps.page as any) || 1
    this.load(page)
  }

  load (nextPage: number) {
    this.setState({loading: true})
    githubApis.listIssues(nextPage).then((body) => {
      this.setState({
        loading: false,
        total: body.total_count,
        page: nextPage,
        articles: body.items
      })
    })
  }

  render (props: IArticlesProps, {loading, articles, page, total}: IArticlesState) {
    if (loading) {
      return <Loader/>
    }

    const totalPage = Math.ceil(total / config.pageSize)

    return (
      <div className='Articles'>
        <ul className='Articles__items'>
          {articles.map((article) => (
            <li className='Articles__item'>
              <span className='Articles__item-date'>{dateUtil.format(article.created_at, 'DD / MM / YYYY')}</span>
              <a href={`/articles/${article.number}`} className='Articles__item-title'>{article.title}</a>
            </li>
          ))}
        </ul>
        <Pagination page={page} total={totalPage}/>
      </div>
    )
  }
}
