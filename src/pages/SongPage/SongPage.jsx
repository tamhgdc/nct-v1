import React from 'react'
import { Outlet } from 'react-router-dom'

const SongPage = () => {
  return (
    <div className='song-page-container'>
      <Outlet />
    </div>
  )
}

export default SongPage