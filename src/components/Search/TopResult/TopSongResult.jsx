import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { CommonArtist, ImageOverlay } from 'components'
import { createSongUrl, handleCopySong } from 'share/utilities'
import { handleAddToFavSong } from 'share/addToFav'
import { useStore } from 'store'

const TopSongResult = ({ song, defineLang }) => {
  const [state] = useStore()
  const navigate = useNavigate()

  if (!song) return null

  const { artists, key, title, type, thumbnail, duration } = song

  const onNavigateSong = () => {
    navigate(createSongUrl(title, key))
  }

  const onCopyLink = (e) => {
    handleCopySong(e, defineLang, title, key)
  }

  const handleAddToFav = (e) => {
    e.stopPropagation()
    handleAddToFavSong(key, defineLang)
  }

  const imageOverlayProps = {
    keyId: key,
    imageUrl: thumbnail,
    title,
    handleNavigate: onNavigateSong,
    copyLink: true,
    handleCopyLink: (e) => onCopyLink(e),
    addToFav: true,
    handleAddToFav: (e) => handleAddToFav(e),
    goToSong: true,
    handleGoToSong: onNavigateSong
  }

  return (
    <div className='tr-slider'>
      <div className='tr-thumb-container'>
        <div className='tr-thumb-main sm:w-150px sm:h-150px md:w-160px md:h-160px ip5:w-140px ip5:h-140px'>
          <ImageOverlay { ... imageOverlayProps} />
        </div>
      </div>
      <div className='tr-description sm:ml-16 ip5:ml-4'>
        <div className='tr-decoration'>#1</div>
        <div className='tr-main-title sm:text-sm ip5:text-13px'>
          <Link to={createSongUrl(title, key)}>{title}</Link>
        </div>
        <CommonArtist artists={artists} />
        <p className='tr-type color-0-5'>{type}</p>
      </div>
    </div>
  )
}

export default TopSongResult
