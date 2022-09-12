import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './CommonSong.scss'

import { createSongUrl, handleCopySong, handlePlayNewSong } from 'share/utilities'
import { basicModal } from 'share/animation'
import { CommonArtist, ExtendModal, ModalAnimate, OptionModal, SquareImg } from 'components'
import IconButton from '@mui/material/IconButton'
import no_song_img from 'images/default/default_song.png'

import { BsHeadphones } from 'react-icons/bs'
import { formatNumber } from 'share'
import { IoMdMore } from 'react-icons/io'

import { useStore, actions } from 'store'
import { handleAddToFavSong } from 'share/addToFav'

const CommonSong = ({ artists, keyId, thumbnail, title, songView, backupImg, optionModalStyles = {} }) => {
  const [state, dispatch] = useStore()
  const defineLang = (vie, eng) => (state.lang === 'vi' ? vie : eng)
  
  const navigate = useNavigate()

  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const positionRef = useRef(null)
  const moreDivRef = useRef(null)

  const toggleShowMore = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

  const onCopyLink = (e) => {
    handleCopySong(e, defineLang, title, keyId)
    toggleShowMore()
  }

  const handleGoToSong = (e) => {
    e.stopPropagation()
    navigate(createSongUrl(title, keyId))
  }

  const handleAddToFav = (e) => {
    e.stopPropagation()
    handleAddToFavSong(keyId, defineLang)
    toggleShowMore()
  }

  const optionModalProps = {
    showModal: showMoreOptions,
    positionRef,
    parentRef: moreDivRef,
    toggleModal: toggleShowMore,
    styles: optionModalStyles
  }

  const modalAnimateProps = {
    animateProps: basicModal,
    isVisible: showMoreOptions,
    keyId,
  }

  const extendModalProps = {
    copyLink: true,
    handleCopyLink: (e) => onCopyLink(e),
    goToSong: true,
    handleGoToSong: (e) => handleGoToSong(e),
    addToFav: true,
    handleAddToFav: (e) => handleAddToFav(e)
  }
  
  return (
    <div className={`common-song-container bg-color-0-02 w3-row hover-bg-color-0-05 ${showMoreOptions && 'focus bg-color-0-05'}`} ref={positionRef} onClick={() => handlePlayNewSong(keyId, dispatch, actions, state.curPlaylist, true, defineLang)}>
      <div className='cs-img-container w3-col border-0-05'>
        <SquareImg imageUrl={thumbnail || backupImg || no_song_img} title={title} />
      </div>
      <div className='cs-extend w3-col w3-right'>
        <div className='cs-view-count w3-row'>
          <div className='cs-head-phone w3-col color-0-5'>
            <BsHeadphones />
          </div>
          <div className='cs-view-count-content w3-col color-0-5'>{formatNumber(songView)}</div>
        </div>
        <div className='cs-more-options'>
          <IconButton className='cs-more-btn' size='large' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
            <div className='cs-more-icon color-0-5'>
              <IoMdMore />
            </div>
          </IconButton>
        </div>
      </div>
      <div className='cs-content w3-rest'>
        <div className='cs-song-title color-0-88'>
          <Link to={createSongUrl(title, keyId)}>{title}</Link>
        </div>
        <CommonArtist artists={artists} />
      </div>
      <OptionModal {... optionModalProps}>
        <ModalAnimate { ... modalAnimateProps }>
          <ExtendModal { ... extendModalProps } />
        </ModalAnimate>
      </OptionModal>
    </div>
  )
}

export default CommonSong
