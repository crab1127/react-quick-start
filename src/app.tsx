/** @format */

import React from 'react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

import routes from '@/router'

const ANIMATION_MAP = {
  PUSH: 'forward',
  POP: 'back',
}

const App = withRouter(({location, history}) => {
  return (
    <TransitionGroup
      className={'router-wrapper'}
      childFactory={child => React.cloneElement(child, {classNames: ANIMATION_MAP[history.action]})}>
      <CSSTransition timeout={400} key={location.pathname} unmountOnExit={true}>
        <React.Suspense fallback={null}>
          <Switch location={location}>
            {routes.map(route => (
              <Route key={route.name} path={route.path} exact={route.exact} component={route.component} />
            ))}
            <Redirect to="/" />
          </Switch>
        </React.Suspense>
      </CSSTransition>
    </TransitionGroup>
  )
})

export default App
