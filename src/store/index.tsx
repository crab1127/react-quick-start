/** @format */

import React from 'react'
import UserStore from './user'

const Store: React.FC = prpos => {
  return <UserStore.Provider>{prpos.children}</UserStore.Provider>
}
export default Store
