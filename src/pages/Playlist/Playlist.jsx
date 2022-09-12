import React from 'react'
import { Outlet } from 'react-router-dom'

const Playlist = () => {
  return (
    <div className='playlist-page-container'>
      <Outlet />
    </div>
  )
}

export default Playlist
