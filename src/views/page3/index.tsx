/** @format */

import React from 'react'
import useRouter from 'use-react-router'

const Index = () => {
  const {history} = useRouter()
  return (
    <div className="content">
      <div>
        <div onClick={() => history.goBack()}>后退</div>
      </div>
      页面33333333333333333333333333333333333333
    </div>
  )
}

export default Index
