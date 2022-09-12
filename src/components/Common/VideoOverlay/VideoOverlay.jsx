import React, { useState, useRef } from 'react'
import noVideoImg from 'images/default/default_video.png'
import './VideoOverlay.scss'

import { ExtendModal, Image, ModalAnimate, OptionModal } from 'components'
import { basicModal } from 'share/animation'

import { BsPlayCircleFill } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { handleCopyVideo } from 'share/utilities'

const VideoOverlay = ({ imageUrl = '', title = '', duration = '', artists = [], keyId = '', handleNagivate, handleAddToFav, defineLang, refMapping = [], handleRefMapping, addToFav, removeFav, handleRemoveFav, removeHistory, handleRemoveHistory }) => {
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

  const onCopyVideo = (e) => {
    handleCopyVideo(e, title, keyId, artists, defineLang)
    toggleShowMore()
  }

  const onAddToFav = (e) => {
    e.stopPropagation()
    handleAddToFav()
    toggleShowMore()
  }

  const onRemoveFav = (e) => {
    e.stopPropagation()
    handleRemoveFav()
    toggleShowMore()
  }

  const onRemoveHistory = (e) => {
    e.stopPropagation()
    handleRemoveHistory()
    toggleShowMore()
  }

  const onHandleRefMapping = (e) => {
    e.stopPropagation()
    handleRefMapping()
    toggleShowMore()
  }

  const optionModalProps = {
    showModal: showMoreOptions,
    positionRef,
    parentRef: moreDivRef,
    toggleModal: toggleShowMore,
  }

  const modalAnimateProps = {
    animateProps: basicModal,
    isVisible: showMoreOptions,
    keyId,
  }

  const extendModalProps = {
    copyLink: true,
    handleCopyLink: onCopyVideo,
    refMapping,
    handleRefMapping: onHandleRefMapping,
    addToFav: addToFav === false ? false : true,
    handleAddToFav: onAddToFav,
    removeFav,
    handleRemoveFav: onRemoveFav,
    removeHistory,
    handleRemoveHistory: onRemoveHistory,
  }

  const imageProps = {
    imageUrl: imageUrl || noVideoImg,
    backupImg: noVideoImg,
    alt: title || '',
    title: title || '',
  }

  return (
    <div className='video-overlay-container' onClick={handleNagivate}>
      <Image {...imageProps} />
      <div className='video-overlay-duration'>{duration}</div>
      <div className='overlay-container' ref={positionRef} title={title || ''}>
        <div className='overlay-play-btn'>
          <BsPlayCircleFill />
        </div>
        <div className='overlay-more-options' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
          <IoMdMore />
        </div>
      </div>
      <OptionModal {...optionModalProps}>
        <ModalAnimate {...modalAnimateProps}>
          <ExtendModal {...extendModalProps} />
        </ModalAnimate>
      </OptionModal>
    </div>
  )
}

export default VideoOverlay
