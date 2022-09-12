import React, { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './CommonVideo.scss'

import { CommonArtist, VideoOverlay } from 'components'
import { createVideoUrl, handlePlayNewSong } from 'share/utilities'

import { useStore, actions } from 'store'
import { handleAddToFavVideo } from 'share/addToFav'

const CommonVideo = ({ keyId = '', artists = [], duration, refMapping = [], thumbnail = '', title = '', videoHeight, addToFav, removeFav, handleRemoveFav, removeHistory, handleRemoveHistory }) => {
  const navigate = useNavigate()

  const [state, dispatch] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const onNavigateVideo = () => {
    navigate(createVideoUrl(keyId, title, artists))
  }

  const handleAddToFav = () => {
    handleAddToFavVideo(keyId, defineLang)
  }

  const handleRefMapping = () => {
    if (refMapping.length !== 0) {
      handlePlayNewSong(refMapping[0].refKey, dispatch, actions, state.curPlaylist, true, defineLang)
    }
  }

  const videoOverlayProps = {
    keyId,
    imageUrl: thumbnail,
    title,
    handleNagivate: onNavigateVideo,
    duration,
    artists,
    defineLang,
    refMapping,
    handleRefMapping,
    handleAddToFav,
    addToFav,
    removeFav,
    handleRemoveFav,
    removeHistory,
    handleRemoveHistory,
  }

  return (
    <div className='common-video-container inherit-width'>
      <div className='cv-video border-0-05' style={{ height: videoHeight }}>
        <VideoOverlay {...videoOverlayProps} />
      </div>
      <div className='cv-title color-0-88 small-title' title={title}>
        <Link to={createVideoUrl(keyId, title, artists)}>{title}</Link>
      </div>
      <CommonArtist artists={artists} />
    </div>
  )
}

export default CommonVideo
