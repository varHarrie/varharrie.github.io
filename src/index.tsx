import 'github-markdown-css/github-markdown.css'
import './index.less'

import * as React from 'preact'

import Blog from './Blog'

React.render(
  <div id='root'>
    <Blog/>
  </div>
, document.body)
