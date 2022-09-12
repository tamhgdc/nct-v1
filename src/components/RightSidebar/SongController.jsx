import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import { OptionModal, ModalAnimate, ExtendModal } from 'components'
import { handleRenderSpeakerIcon, volumnSlider, timeSlider } from 'services/RightSidebar/SongController'
import { basicModal } from 'share/animation'
import { IoMdMore } from 'react-icons/io'
import { createSongUrl, handleCopySong, handlePlayNewSong } from 'share/utilities'
import { handleAddToFavSong } from 'share/addToFav'
import { convertDuration } from 'share'
import { BsFillPlayFill, BsPauseFill, BsShuffle, BsSkipBackwardFill, BsFillSkipForwardFill } from 'react-icons/bs'
import { useStore } from 'store'
import { Tooltip, IconButton } from '@mui/material'
import { FiRepeat } from 'react-icons/fi'

const SongController = ({ defineLang, title = '', keyId = '', currentTime, setCurrentTime, audioPlayer = {}, random, toggleRandom, isPlaying, setIsPlaying, handlePlaying, toggleLoop, isLoop, showPlaylist, toggleShowPlaylist, duration, songDuration, handleNextSong, handlePreviousSong }) => {
  const [state] = useStore()

  const navigate = useNavigate()
  const [showMore, setShowMore] = useState(false)
  const [volumn, setVolumn] = useState(parseInt(localStorage.getItem('audioVolumn')) || 100)

  const parentRef = useRef(null)
  const moreDivRef = useRef(null)

  useEffect(() => {
    if (audioPlayer.readyState) {
      const localVolumn = localStorage.getItem('audioVolumn')
  
      if (localVolumn) {
        setVolumn(parseInt(localVolumn))
        audioPlayer.volume = parseInt(localVolumn) / 100
      }
    }
  }, [audioPlayer.readyState])

  const toggleShowMore = () => {
    setShowMore(!showMore)
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
    showModal: showMore,
    positionRef: moreDivRef,
    parentRef,
    toggleModal: toggleShowMore,
    styles: {
      transform: `translate(${defineLang('45%', '70%')}, -105%)`,
    },
  }

  const modalAnimateProps = {
    animateProps: basicModal,
    isVisible: showMore,
    keyId,
  }

  const extendModalProps = {
    copyLink: true,
    handleCopyLink: (e) => onCopyLink(e),
    goToSong: true,
    handleGoToSong: (e) => handleGoToSong(e),
    addToFav: true,
    handleAddToFav: (e) => handleAddToFav(e),
  }

  const handleChangeVolumn = (value) => {
    setVolumn(value)
    audioPlayer.volume = value / 100
    localStorage.setItem('audioVolumn', value)
  }

  const handleChangeTime = (value) => {
    setCurrentTime(value)
    audioPlayer.pause()
    audioPlayer.currentTime = value
  }

  const handleAfterChangeTime = (value) => {
    setCurrentTime(value)
    setIsPlaying(true)
    audioPlayer.play()
  }

  const volumnSliderProps = {
    ...volumnSlider,
    value: volumn,
    onChange: handleChangeVolumn,
  }

  const getSeekableAudio = () => {
    if (audioPlayer && audioPlayer.readyState) {
      const seekableEnd = audioPlayer?.seekable?.end(0)
      if (seekableEnd) {
        return `${(seekableEnd / duration) * 100}%`
      } else {
        return 0
      }
    } else {
      return 0
    }
  }

  const timeSliderProps = {
    ...timeSlider,
    railStyle: {
      width: getSeekableAudio(),
      height: '0.2rem',
      maxWidth: '100%',
      backgroundColor: state.theme === 'light' ? 'rgba(28,30,32,0.1)' : 'rgba(244, 246, 248, 0.1)',
      borderRadius: '1rem',
    },
    value: audioPlayer.currentTime || 0,
    max: Math.floor(duration) || 0,
    onChange: handleChangeTime,
    onAfterChange: handleAfterChangeTime,
  }

  const handleClickSpeaker = () => {
    if (volumn === 0) {
      setVolumn(100)
      audioPlayer.volume = 1
    } else {
      setVolumn(0)
      audioPlayer.volume = 0
    }
  }

  return (
    <div className='w-[27.2rem] m-auto pt-8'>
      <div className='flex justify-between'>
        <div className='group relative w-38px rounded-bl-19px rounded-br-19px cursor-pointer' ref={moreDivRef}>
          <div className='z-8' onClick={handleClickSpeaker}>
            <i className={`fa-solid fa-volume-${handleRenderSpeakerIcon(volumn)} color-0-5 w-38px h-38px absolute z-10 bottom-0 rounded-bl-19px rounded-br-19px text-15px p-4`} />
          </div>
          <div className='absolute bottom-0 z-9 left-0 w-full pt-18px pb-36px bg-color-1 rounded-18px origin-bottom opacity-100 scale-0 bg-color-1 transition-all duration-300 invisible shadow-normal select-none group-hover:scale-100 group-hover:visible'>
            <Slider {...volumnSliderProps} />
          </div>
        </div>
        <div className='w-168px h-38px cursor-pointer rounded-19px bg-color-0-02 hover:shadow-sm' onClick={toggleShowPlaylist}>
          <div className='color-0-5 text-13px text-center mt-4 select-none font-medium'>{showPlaylist ? defineLang('Đang phát', 'Now playing') : defineLang('Danh sách phát', 'Song list')}</div>
        </div>
        <div>
          <IconButton className='flex h-16 w-16 color-0-5' size='medium' onClick={(e) => handleMoreOptions(e)} ref={parentRef}>
            <div className='flex rounded-4px text-xl'>
              <IoMdMore />
            </div>
          </IconButton>
          <OptionModal {...optionModalProps}>
            <ModalAnimate {...modalAnimateProps}>
              <ExtendModal {...extendModalProps} />
            </ModalAnimate>
          </OptionModal>
        </div>
      </div>
      <div className='time-slider flex justify-between mt-24px'>
        <div className='text-left w-44px text-10px color-0-88'>{convertDuration(currentTime)}</div>
        <Slider {...timeSliderProps} />
        <div className='text-right w-44px text-10-px color-0-88'>{songDuration || convertDuration(duration || 0)}</div>
      </div>
      <div className='mt-16px h-36px flex items-center justify-between'>
        <div className='w-38px h-38px rounded-circle cursor-pointer' onClick={toggleRandom}>
          <Tooltip title={defineLang('Ngẫu nhiên', 'Random')} placement='bottom' enterDelay={400}>
            <IconButton className='w-full h-full' aria-label='ramdom-song' size='medium'>
              <BsShuffle className={`${random && 'text-main'} transition-colors`} />
            </IconButton>
          </Tooltip>
        </div>
        <div className='w-38px h-38px relative cursor-pointer rounded-circle' onClick={handlePreviousSong}>
          <Tooltip title={defineLang('Bài trước', 'Previous')} placement='bottom' enterDelay={400}>
            <IconButton className='w-full h-full' aria-label='previous-song' size='medium'>
              <BsSkipBackwardFill />
            </IconButton>
          </Tooltip>
        </div>
        <div className='w-20 h-20 relative cursor-pointer rounded-circle' onClick={handlePlaying}>
          <IconButton className='w-full h-full text-3xl' aria-label='play-pause-song' size='medium'>
            {isPlaying ? <BsPauseFill className='scale-150' /> : <BsFillPlayFill className='scale-150' />}
          </IconButton>
        </div>
        <div className='w-38px h-38px relative cursor-pointer rounded-circle' onClick={handleNextSong}>
          <Tooltip title={defineLang('Tiếp theo', 'Next')} placement='bottom' enterDelay={400}>
            <IconButton className='w-full h-full' aria-label='next-song' size='medium'>
              <BsFillSkipForwardFill />
            </IconButton>
          </Tooltip>
        </div>
        <div className='w-38px h-38px rounded-circle cursor-pointer' onClick={toggleLoop}>
          <Tooltip title={defineLang('Lặp lại', 'Repeat')} placement='bottom' enterDelay={400}>
            <IconButton className='w-full h-full' aria-label='repeat-song' size='medium'>
              <FiRepeat className={`${isLoop && 'text-main'} transition-colors`} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default SongController
