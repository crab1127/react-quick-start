/** @format */

import {lazy} from 'react'

export default [
  {
    name: 'Index',
    path: '/',
    exact: true,
    component: lazy(() => import('./views/page1/index')),
  },
  {
    name: 'Index',
    path: '/page2',
    exact: true,
    component: lazy(() => import('./views/page2/index')),
  },
  {
    name: 'Index',
    path: '/page3',
    exact: true,
    component: lazy(() => import('./views/page3/index')),
  },
  {
    name: 'Index',
    path: '/page4',
    exact: true,
    component: lazy(() => import('./views/page4/index')),
  },
]
