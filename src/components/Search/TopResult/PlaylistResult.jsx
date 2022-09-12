import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { CommonArtist, ImageOverlay } from 'components'

import { createPlaylistUrl, handleCopyPlaylist } from 'share/utilities'
import { handleAddToFavPlaylist } from 'share/addToFav'

const PlaylistResult = ({ playlist, favPlaylists, defineLang }) => {
  const navigate = useNavigate()

  if (!playlist) return null

  const { artists, key, title, type, thumbnail } = playlist

  const onNavigatePlaylist = () => {
    navigate(createPlaylistUrl(title, key))
  }

  const onCopyPlaylist = (e) => {
    handleCopyPlaylist(e, title, key, defineLang)
  }

  const handleAddToFav = () => {
    handleAddToFavPlaylist(key, defineLang)
  }

  const imageOverlayProps = {
    keyId: key,
    imageUrl: thumbnail,
    title,
    handleNavigate: onNavigatePlaylist,
    copyLink: true,
    handleCopyLink: (e) => onCopyPlaylist(e),
    addToFav: true,
    handleAddToFav
  }

  return (
    <div className='tr-slider'>
      <div className='tr-thumb-container'>
        <div className='tr-thumb-main sm:w-150px sm:h-150px md:w-160px md:h-160px ip5:w-140px ip5:h-140px'>
          <ImageOverlay { ... imageOverlayProps } />
        </div>
      </div>
      <div className='tr-description sm:ml-16 ip5:ml-4'>
        <div className='tr-decoration'>#1</div>
        <div className='tr-main-title sm:text-sm ip5:text-13px'>
          <Link to={createPlaylistUrl(title, key)}>{title}</Link>
        </div>
        <CommonArtist artists={artists} />
        <p className='tr-type color-0-5'>{type}</p>
      </div>
    </div>
  )
}

export default PlaylistResult
