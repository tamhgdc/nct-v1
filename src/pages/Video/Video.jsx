import React from 'react'
import { Outlet } from 'react-router-dom'

const Video = () => {
  return (
    <div className='video-page-container'>
      <Outlet />
    </div>
  )
}

export default Video
