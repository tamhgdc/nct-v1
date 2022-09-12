import React from 'react'
import { Outlet } from 'react-router-dom'

import { auth } from 'config/firebase'
import { NoUserFound } from 'components'

const User = () => {

  if (!auth.currentUser) return <NoUserFound />

  return (
    <div className='user-container'>
      <Outlet />
    </div>
  )
}

export default User