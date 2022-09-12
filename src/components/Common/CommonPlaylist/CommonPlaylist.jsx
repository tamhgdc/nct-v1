import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noPlaylistImg from 'images/default/default_playlist.png'
import './CommonPlaylist.scss'

import { CommonArtist, ShadowOverlay } from 'components'
import { createPlaylistUrl, handleCopyPlaylist } from 'share/utilities'

import { useStore } from 'store'
import { handleAddToFavPlaylist } from 'share/addToFav'

const CommonPlaylist = ({ keyId, artists, thumbnail, title, type, addToFav, removeFav, handleRemoveFav, removeHistory, handleRemoveHistory }) => {
  const [state] = useStore()
  const { lang } = state
  const defineLang = (vie, eng) => (lang === 'vi' ? vie : eng)

  const navigate = useNavigate()

  const onNavigatePlaylist = () => {
    navigate(createPlaylistUrl(title, keyId))
  }

  const onCopyPlaylist = (e) => {
    handleCopyPlaylist(e, title, keyId, defineLang)
  }

  const handleAddToFav = () => {
    handleAddToFavPlaylist(keyId, defineLang)
  }

  const shadowOverlayProps = {
    width: '100%',
    shadowHeight: '0.6rem',
    imageUrl: thumbnail,
    keyId,
    title,
    handleNavigate: onNavigatePlaylist,
    copyLink: true,
    handleCopyLink: (e) => onCopyPlaylist(e),
    addToFav: addToFav === false ? false : true,
    handleAddToFav,
    removeFav,
    handleRemoveFav,
    removeHistory,
    handleRemoveHistory,
    backupImg: noPlaylistImg,
  }

  return (
    <div className='common-playlist-container inherit-width'>
      <ShadowOverlay {...shadowOverlayProps} />
      <div className='common-playlist-title color-0-88' title={title}>
        <Link to={createPlaylistUrl(title, keyId)}>{title}</Link>
      </div>
      <CommonArtist artists={artists} />
    </div>
  )
}

export default CommonPlaylist
