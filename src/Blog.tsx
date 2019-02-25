import {createHashHistory} from 'history'
import * as React from 'preact'
import {Router} from 'preact-router'

import Article from './Article'
import Articles from './Articles'

const history = createHashHistory()

export interface IBlogProps {}

export interface IBlogState {}

export default class Blog extends React.Component<IBlogProps, IBlogState> {

  constructor (props: IBlogProps) {
    super(props)
    this.state = {}
  }

  render (props: any) {
    return (
      <div className='Blog'>
        <div className='Blog__header'>
          <div className='Blog__title'>
            <a href='/'>VARHARRIE</a>
          </div>
          <ul className='Blog__links'>
            <li className='Blog__link'>
              <a href='https://github.com/varHarrie'>GitHub</a>
            </li>
            <li className='Blog__link'>
              <a href='https://weibo.com/u/2960702231'>Weibo</a>
            </li>
            <li className='Blog__link'>
              <a href='mailto:varharrie@gmail.com'>Email</a>
            </li>
          </ul>
        </div>
        <div className='Blog__body'>
          <Router history={history}>
            <Articles path='/:page?'/>
            <Article path='/articles/:number'/>
          </Router>
        </div>
        <div className='Blog__footer'></div>
      </div>
    )
  }
}
