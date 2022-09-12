import React from 'react'
import { Outlet } from 'react-router-dom'

const Topic = () => {
  return (
    <div className='topic-page-container'>
      <Outlet />
    </div>
  )
}

export default Topic