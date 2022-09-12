import React from 'react'
import noSongImg from 'images/default/default_song.png'
import { Link, useNavigate } from 'react-router-dom'

import { CommonArtist, ImageOverlay } from 'components'
import { useStore } from 'store'
import { createSongUrl, handleCopySong } from 'share/utilities'
import { handleAddToFavSong } from 'share/addToFav'

const SongSquare = ({ keyId, artists, title, thumbnail, backupImg }) => {
  const [state] = useStore()
  const defineLang = (vie, eng) => state.lang === 'vi' ? vie : eng
  const navigate = useNavigate()

  const onNavigateSong = () => {
    navigate(createSongUrl(title, keyId))
  }

  const onCopyLink = (e) => {
    handleCopySong(e, defineLang, title, keyId)
  }

  const handleAddToFav = (e) => {
    e.stopPropagation()
    handleAddToFavSong(keyId, defineLang)
  }
  
  const imageOverlayProps = {
    keyId,
    imageUrl: thumbnail || backupImg || noSongImg,
    title,
    handleNavigate: onNavigateSong,
    copyLink: true,
    handleCopyLink: (e) => onCopyLink(e),
    addToFav: true,
    handleAddToFav: (e) => handleAddToFav(e),
    goToSong: true,
    handleGoToSong: onNavigateSong,
    backupImg: noSongImg
  }

  return (
    <div className='song-square-container inherit-width'>
      <ImageOverlay { ... imageOverlayProps } />
      <div className="small-title color-0-88" style={{ marginTop: '0.6rem'}}>
        <Link to={createSongUrl(title, keyId)}>{title}</Link>
      </div>
      <CommonArtist artists={artists} />
    </div>
  )
}

export default SongSquare