/** @format */

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {HashRouter} from 'react-router-dom'
import Monitor from 'monitor-sdk_crab'
import Store from '@/store'
import App from './app'
import './assets/less/app.less'
import './config'

// 初始监控
Monitor.init({projectId: 0, envId: 0})

ReactDOM.render(
  <Store>
    <HashRouter basename="/">
      <App />
    </HashRouter>
  </Store>,
  document.getElementById('app') as HTMLElement,
)
