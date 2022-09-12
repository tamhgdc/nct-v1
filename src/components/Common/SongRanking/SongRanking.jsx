import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import no_song_img from 'images/default/default_song.png'

import { CommonArtist, ExtendModal, Image, ModalAnimate, OptionModal, RankPosition } from 'components'
import IconButton from '@mui/material/IconButton'
import { IoMdArrowDropdown, IoMdArrowDropup, IoMdMore } from 'react-icons/io'
import { createSongUrl, createVideoUrl, handleCopySong, handlePlayNewSong } from 'share/utilities'
import { handleAddToFavSong, handleAddToFavVideo } from 'share/addToFav'
import { basicModal } from 'share/animation'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { useStore, actions } from 'store'

const SongRanking = ({ songKey = '', position = 0, defineLang, artists = [], thumbnail = '', title = '', isVideo, hasRanking, highestPosition = 0, oldPosition = 0, totalWeekInRanked = 0, showDetail }) => {
  const [state, dispatch] = useStore()
  const navigate = useNavigate()
  const [showMore, setShowMore] = useState(false)
  const [showRanking, setShowRanking] = useState(false)

  const moreDivRef = useRef(null)

  const toggleShowMore = () => {
    setShowMore(!showMore)
  }

  const toggleShowRanking = () => {
    setShowRanking(!showRanking)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

  const onCopyLink = (e) => {
    handleCopySong(e, defineLang, title, songKey)
    toggleShowMore()
  }

  const handleGoToSong = (e) => {
    e.stopPropagation()
    navigate(createSongUrl(title, songKey))
  }

  const handleAddToFav = (e) => {
    e.stopPropagation()
    if (isVideo) {
      handleAddToFavVideo(songKey, defineLang)
    } else {
      handleAddToFavSong(songKey, defineLang)
    }
    toggleShowMore()
  }

  const optionModalProps = {
    showModal: showMore,
    positionRef: moreDivRef,
    parentRef: moreDivRef,
    toggleModal: toggleShowMore,
  }

  const modalAnimateProps = {
    animateProps: basicModal,
    isVisible: showMore,
    keyId: songKey,
  }

  const extendModalProps = {
    copyLink: true,
    handleCopyLink: (e) => onCopyLink(e),
    goToSong: true && !isVideo,
    handleGoToSong: (e) => handleGoToSong(e),
    addToFav: true,
    handleAddToFav: (e) => handleAddToFav(e),
  }

  const handleRanking = () => {
    if (oldPosition === 0) {
      return (
        <div className='rank-tag new-song'>
          <p className='text-yellow rank-number'>{defineLang('Mới', 'New')}</p>
        </div>
      )
    } else if (oldPosition === position) {
      return <React.Fragment>-</React.Fragment>
    } else if (position > oldPosition) {
      return (
        <div className='rank-tag rank-down text-hot'>
          <IoMdArrowDropdown className='text-lg' />
          <p className='rank-number'>{position - oldPosition}</p>
        </div>
      )
    } else if (oldPosition > position) {
      return (
        <div className='rank-tag rank-up text-green'>
          <IoMdArrowDropup className='text-lg' />
          <p className='rank-number'>{oldPosition - position}</p>
        </div>
      )
    }
  }

  const imageProps = { imageUrl: thumbnail || no_song_img, backupImg: no_song_img }

  const artistStyles = '!mt-1'

  const rankPositionProps = { highestPosition, oldPosition, totalWeekInRanked, defineLang }

  const handleClickNewSong = () => {
    if (!isVideo) {
      handlePlayNewSong(songKey, dispatch, actions, state.curPlaylist, true, defineLang)
    }
  }

  const handleClickNavigate = () => {
    if (isVideo) {
      navigate(createVideoUrl(songKey, title, artists))
    }
  }

  return (
    <div className={`h-56px mx-32px mb-1 w3-row transition-height will-change-height ${showRanking && 'h-144px'}`}>
      <div className='w3-col w-32px h-32px bg-color-0-02 text-center mt-12px mr-8px text-13px color-0-5 rounded-circle leading-32px'>{position}</div>
      <div className='w3-rest h-full bg-color-0-02 hover-bg-color-0-05 rounded-4px transition-colors cursor-pointer group' onClick={handleClickNewSong}>
        <div className='h-16 mt-8px sm:mr-24px ip5:mr-8px mb-16px sm:ml-8px ip5:ml-4px w3-row'>
          <div className={`w3-col h16 w-16 useBorder border-0-1 rounded mr-16px ${isVideo ? 'w-72px' : ''}`} onClick={handleClickNavigate}>
            <Image className='w-full h-full rounded-2px' {...imageProps} />
          </div>
          {hasRanking && (
            <React.Fragment>
              {showDetail && (
                <div className={`w3-col w3-right w-fit h-16 flexCenter mr-2px color-0-5 transition-transform text-lg hoverMainColor ${showRanking && 'rotate-180'}`} onClick={toggleShowRanking}>
                  <MdOutlineKeyboardArrowDown />
                </div>
              )}
              <div className='w3-right w3-col flexCenter width-24px h-16 leading-16 text-lg sm:mr-24px ip5:mr-8px ip6:mr-12px color-0-5'>{handleRanking()}</div>
            </React.Fragment>
          )}
          <div className='w3-right mr-14px w-fit invisible group-hover:visible'>
            <IconButton className='flex h-16 w-16 color-0-5' size='medium' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
              <div className='cs-more-icon flex rounded-4px text-xl'>
                <IoMdMore />
              </div>
            </IconButton>
          </div>
          <div className='w3-rest overflow-hidden'>
            <div className='w-fit h-20px leading-20px max-w-full text-13px font-semibold truncate color-0-88 hover:!text-main transition-colors' title={title} onClick={handleClickNavigate}>
              {title}
            </div>
            <CommonArtist artists={artists} styles={artistStyles} />
          </div>
        </div>
        {showRanking && showDetail && (
          <div className='pt-4px ml-16px mt-16px'>
            <RankPosition { ... rankPositionProps } />
          </div>
        )}
      </div>
      <OptionModal {...optionModalProps}>
        <ModalAnimate {...modalAnimateProps}>
          <ExtendModal {...extendModalProps} />
        </ModalAnimate>
      </OptionModal>
    </div>
  )
}

export default SongRanking
