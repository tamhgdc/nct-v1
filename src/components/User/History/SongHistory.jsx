import React, { useState, useEffect } from 'react'

import { getUserDetail, handleClearAllHistory } from 'services/firebase/firestore'
import { SongList } from 'components'
import { getListSongsKey, getSongsView } from 'share/utilities'
import { getUserSongs } from 'services/User/User'

const SongHistory = ({ defineLang, currentUser = {} }) => {
  const [historySongs, setHistorySongs] = useState([])
  const [songsView, setSongsView] = useState({})

  const onHandleClearAllHistory = async () => {
    await handleClearAllHistory('songs', defineLang)
    setHistorySongs([])
  }

  useEffect(() => {
    const getHistorySongsData = async () => {
      const { history } = await getUserDetail()
      if (history.songs) {
        const data = await getUserSongs(history.songs)

        setHistorySongs(data)
      }
    }

    getHistorySongsData()
  }, [])

  useEffect(() => {
    try {
      if (historySongs.length !== 0) {
        const getSongsViewState = async (historySongsKey) => {
          const songsView = await getSongsView(historySongsKey)
          setSongsView(songsView)
        }

        getSongsViewState(getListSongsKey(historySongs))
      }
    } catch (error) {
      throw new Error(error)
    }
  }, [historySongs])

  if (!currentUser) return null

  const songListProps = { defineLang, listSong: historySongs.slice().reverse(), removeHistory: true, setHistorySongs, songsView, setHistorySongs }

  return (
    <div className='sf-main'>
      <div className='song-list common-title color-0-88 alcenter-jcbetween'>
        <div className='sf-title-content'>{defineLang('Danh sách bài hát', 'Song list')}</div>
        {historySongs.length !== 0 && (
          <div className='clear-all-song clickable small-common color-0-5' onClick={onHandleClearAllHistory}>
            {defineLang('Xóa tất cả', 'Clear all')}
          </div>
        )}
      </div>
      <SongList {...songListProps} />
    </div>
  )
}

export default SongHistory
