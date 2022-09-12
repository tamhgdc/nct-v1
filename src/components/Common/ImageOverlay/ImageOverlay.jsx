import React, { useState, useRef } from 'react'
import noImg from 'images/default/default_player.jpg'
import './ImageOverlay.scss'

import { ExtendModal, Image, ModalAnimate, OptionModal } from 'components'

import { BsPlayCircleFill } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { basicModal } from 'share/animation'

const ImageOverlay = ({ keyId, imageUrl, title, backupImg, handleNavigate, addToFav, handleAddToFav, copyLink, handleCopyLink, goToSong, handleGoToSong, removeFav, handleRemoveFav, removeHistory, handleRemoveHistory }) => {
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
    handleCopyLink(e)
    toggleShowMore()
  }

  const onAddToFav = (e) => {
    e.stopPropagation()
    handleAddToFav(e)
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
    addToFav,
    handleAddToFav: (e) => onAddToFav(e),
    copyLink,
    handleCopyLink: (e) => onCopyLink(e),
    goToSong,
    handleGoToSong: (e) => handleGoToSong(e),
    removeFav,
    handleRemoveFav: (e) => onRemoveFav(e), 
    removeHistory, 
    handleRemoveHistory: (e) => onRemoveHistory(e),
  }

  const imageProps = {
    imageUrl: imageUrl || noImg,
    backupImg,
    alt: title || '',
    title: title || '',
    className: 'io-img',
  }

  return (
    <div className='img-overlay-container' onClick={handleNavigate}>
      <Image {...imageProps} />
      <OptionModal {...optionModalProps}>
        <ModalAnimate {...modalAnimateProps}>
          <ExtendModal {...extendModalProps} />
        </ModalAnimate>
      </OptionModal>
      <div className='overlay-container' ref={positionRef} title={title || ''}>
        <div className='overlay-play-btn'>
          <BsPlayCircleFill />
        </div>
        <div className='overlay-more-options' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
          <IoMdMore />
        </div>
      </div>
    </div>
  )
}

export default ImageOverlay
