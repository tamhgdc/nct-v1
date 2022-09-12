import React, { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import { getUserPlaylists } from 'services/User/User'
import { getUserDetail, handleClearAllHistory, removeHistoryItem } from 'services/firebase/firestore'
import { CommonPlaylist, NotFoundV2 } from 'components'
import { isValid } from 'share/utilities'

const PlaylistHistory = ({ defineLang, currentUser }) => {
  const [historyPlaylists, setHistoryPlaylists] = useState([])

  const onHandleClearAllHistory = async () => {
    await handleClearAllHistory('playlists', defineLang)
    setHistoryPlaylists([])
  }

  const handleRemoveHistory = async (keyId) => {
    const { history } = await getUserDetail()

    const playlistToRemove = history.playlists.filter((playlistId) => playlistId === keyId)[0]

    await removeHistoryItem(playlistToRemove, 'playlist', defineLang)
    setHistoryPlaylists(historyPlaylists.filter((playlist) => playlist.key !== keyId))
  }

  useEffect(() => {
    try {
      const getHistoryPlaylistsData = async () => {
        const { history } = await getUserDetail()
        if (history.playlists) {
          const data = await getUserPlaylists(history.playlists)

          setHistoryPlaylists(data)
        }
      }

      getHistoryPlaylistsData()
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  if (!currentUser) return null

  return (
    <div className='playlist-fav-container'>
      <div className='playlist-fav-title alcenter-jcbetween'>
        <div className='playlist-fav-title-content common-title color-0-88'>{defineLang('Danh sách phát', 'Playlist')}</div>
        {historyPlaylists.length !== 0 && isValid(historyPlaylists) && (
          <div className='clear-all clickable small-common color-0-6' onClick={onHandleClearAllHistory}>
            {defineLang('Xóa tất cả', 'Clear all')}
          </div>
        )}
      </div>
      <div className='playlist-fav-main pt2'>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {historyPlaylists
            .slice()
            .reverse()
            .map((playlist) => playlist && (
              <Grid item key={playlist.key} xs={6} sm={4} md={4} lg={3} xl={2}>
                <CommonPlaylist {...playlist} keyId={playlist.key} addToFav={false} removeHistory handleRemoveHistory={() => handleRemoveHistory(playlist.key)} />
              </Grid>
            ))}
        </Grid>
      </div>
      {historyPlaylists.length === 0 && (
        <div className='no-fav-playlist h100'>
          <NotFoundV2 message={defineLang('Bạn chưa xem danh sách phát nào.', "You haven't watched any playlists yet.")} />
        </div>
      )}
    </div>
  )
}

export default PlaylistHistory