import React from 'react'
import { Outlet } from 'react-router-dom'

const Artist = () => {
  return (
    <div className='artist-page-container'>
      <Outlet />
    </div>
  )
}

export default Artist