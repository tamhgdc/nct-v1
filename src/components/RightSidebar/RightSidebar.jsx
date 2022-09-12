import React, { useState, useEffect, useCallback, useRef } from 'react'
import './RightSidebar.scss'

import { NoPlayingSong, PlayingSongMain, SongController } from 'components'
import { getPlayingSong, getPlayingSongIndex, handlePlayNewSong } from 'share/utilities'
import { useStore, actions } from 'store'
import { getListSongsKey, getMaybeLike, getSongsView } from 'share/utilities'
import { useWindowSize, useOnClickOutside } from 'hooks'
import { TbArrowBarToLeft } from 'react-icons/tb'

const RightSidebar = () => {
  const [state, dispatch] = useStore()
  const { lang, playingSongId = '', curPlaylist = [] } = state
  const size = useWindowSize()

  const [showRightSidebar, setShowRightSidebar] = useState(size.width > 1280)
  const rightSidebarRef = useRef(null)

  useEffect(() => {
    setShowRightSidebar(size.width > 1280)
  }, [size.width])

  useOnClickOutside(rightSidebarRef, rightSidebarRef, () => {
    if (showRightSidebar) setShowRightSidebar(false)
  })

  const [playingSong, setPlayingSong] = useState(null)
  const [songsView, setSongsView] = useState({})
  const [tempPlayedSongs, setTempPlayedSongs] = useState([])

  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [random, setRamdom] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoop, setIsLoop] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)

  const toggleRandom = () => setRamdom(!random)
  const toggleLoop = () => setIsLoop(!isLoop)
  const toggleShowPlaylist = () => setShowPlaylist(!showPlaylist)

  const audioRef = useRef({})

  const handlePlaying = () => {
    if (audioRef.current?.readyState) {
      const prevValue = isPlaying
      setIsPlaying(!prevValue)
      if (!prevValue) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }

  const handleUpdateTime = () => {
    setCurrentTime(Math.floor(audioRef.current.currentTime))
  }

  const handleRandomSong = () => {
    const randomSongIndex = Math.floor(Math.random() * curPlaylist.length)

    if (tempPlayedSongs.length >= curPlaylist.length) setTempPlayedSongs([])

    if (tempPlayedSongs.includes(curPlaylist[randomSongIndex].key)) {
      handleRandomSong()
    } else {
      handlePlayNewSong(curPlaylist[randomSongIndex].key, dispatch, actions, curPlaylist, false, defineLang)
    }
  }

  const handleNextSong = () => {
    if (random) {
      handleRandomSong()
    } else {
      const playingSongIndex = getPlayingSongIndex(playingSongId, curPlaylist)

      if ((playingSongIndex && playingSongIndex !== curPlaylist.length - 1) || playingSongIndex === 0) {
        handlePlayNewSong(curPlaylist[playingSongIndex + 1].key, dispatch, actions, curPlaylist, false, defineLang)
      } else {
        handlePlayNewSong(curPlaylist[0].key, dispatch, actions, curPlaylist, false, defineLang)
      }
    }
  }

  const handlePreviousSong = () => {
    if (random) {
      handleRandomSong()
    } else {
      const playingSongIndex = getPlayingSongIndex(playingSongId, curPlaylist)

      if (playingSongIndex) {
        handlePlayNewSong(curPlaylist[playingSongIndex - 1].key, dispatch, actions, curPlaylist, false, defineLang)
      } else {
        handlePlayNewSong(curPlaylist[curPlaylist.length - 1].key, dispatch, actions, curPlaylist, false, defineLang)
      }
    }
  }

  const handleSongEnded = () => {
    setIsPlaying(false)
    if (isPlaying) {
      if (random) {
        handleRandomSong()
      } else {
        handleNextSong()
      }
      setIsPlaying(true)
    }
  }

  const handleSongCanplay = () => {
    if (audioRef.current?.readyState && isPlaying) {
      audioRef.current.play()
    }
  }

  useEffect(() => {
    try {
      if (playingSongId) {
        const getPlayingSongState = async () => {
          const playingSong = await getPlayingSong(playingSongId)
          playingSong.songView = await getSongsView(playingSongId)

          if (!tempPlayedSongs.includes(playingSong.key)) setTempPlayedSongs((prevSongs) => [...prevSongs, playingSong.key])

          setPlayingSong(playingSong)

          if (audioRef.current?.readyState) {
            setDuration(audioRef.current?.duration)
            setCurrentTime(0)
            setIsPlaying(true)
            audioRef.current.currentTime = 0
          }
        }

        getPlayingSongState()
      }
    } catch (error) {
      throw new Error(error)
    }
  }, [playingSongId])

  useEffect(() => {
    try {
      const getCurrentPlaylistState = async () => {
        const localSongId = localStorage.getItem('playingSongId')

        if (localSongId) {
          const curPlaylist = await getMaybeLike(localSongId, 'song')

          dispatch(actions.setCurPlaylist(curPlaylist?.data))
        }
      }

      getCurrentPlaylistState()
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  useEffect(() => {
    try {
      if (curPlaylist.length !== 0) {
        const getSongsViewState = async () => {
          const songsView = await getSongsView(getListSongsKey(curPlaylist))

          setSongsView(songsView)
        }

        setTempPlayedSongs([])
        getSongsViewState()
      }
    } catch (error) {
      throw new Error(error)
    }
  }, [curPlaylist])

  useEffect(() => {
    setDuration(audioRef.current?.duration)
  }, [audioRef?.current?.loadedmetadata, audioRef?.current?.readyState])

  const defineLang = useCallback((vie, eng) => (lang === 'vi' ? vie : eng), [lang])

  const noPlayingSongProps = {
    defineLang,
    showRightSidebar,
    rightSidebarRef,
  }

  if (!playingSong) return <NoPlayingSong {...noPlayingSongProps} />

  const { thumbnail = '', title = '', key = '', artists = [], streamUrls = [], songView = 0, duration: songDuration = '' } = playingSong

  const commmonProps = {
    defineLang,
    title,
    keyId: key,
    showPlaylist,
    toggleShowPlaylist,
  }

  const playingSongMainProps = {
    thumbnail,
    artists,
    songView,
    songsView,
    curPlaylist,
    actions,
    dispatch,
  }

  const songControllerProps = {
    currentTime,
    random,
    toggleRandom,
    isPlaying,
    handlePlaying,
    isLoop,
    toggleLoop,
    duration,
    songDuration,
    audioPlayer: audioRef.current || {},
    setIsPlaying,
    setCurrentTime,
    handleNextSong,
    handlePreviousSong,
  }

  const audioProps = {
    preload: 'metadata',
    controls: false,
    ref: audioRef,
    src: streamUrls[0]?.streamUrl,
    onTimeUpdate: handleUpdateTime,
    onEnded: handleSongEnded,
    loop: isLoop,
    onCanPlay: handleSongCanplay,
  }

  return (
    <React.Fragment>
      <div className={`rb-container bg-color-1 h-screen w-320px fixed top-0 ip5:-right-200vh xl:right-0 z-9 transition-all duration-300 border-l border-solid border-0-05 ${showRightSidebar && '!right-0'}`} ref={rightSidebarRef}>
        <PlayingSongMain {...commmonProps} {...playingSongMainProps} />
        <SongController {...commmonProps} {...songControllerProps} />
        <audio {...audioProps} />
      </div>
      <div className={`fixed flexCenter w-16 rounded-tl-4px cursor-pointer rounded-bl-4px h-16 bg-color-0-2 z-8 shadow-medium right-0 xl:-bottom-4 ${!showRightSidebar && 'ip5: bottom-16px'}`} onClick={() => setShowRightSidebar(true)}>
        <TbArrowBarToLeft className='text-xl font-medium color-0-6' />
      </div>
    </React.Fragment>
  )
}

export default RightSidebar
