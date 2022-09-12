import React, { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import { getUserPlaylists } from 'services/User/User'
import { getUserDetail, handleClearAllFav, removeFavItem } from 'services/firebase/firestore'
import { CommonPlaylist, NotFoundV2 } from 'components'
import { isValid } from 'share/utilities'

const PlaylistFav = ({ defineLang, currentUser }) => {
  const [favPlaylists, setFavPlaylists] = useState([])

  const onHandleClearAllFav = async () => {
    await handleClearAllFav('playlists', defineLang)
    setFavPlaylists([])
  }

  const handleRemoveFav = async (keyId) => {
    const { favorite } = await getUserDetail()

    const playlistToRemove = favorite.playlists.filter((playlistId) => playlistId === keyId)[0]

    await removeFavItem(playlistToRemove, 'playlist', defineLang)
    setFavPlaylists(favPlaylists.filter((playlist) => playlist.key !== keyId))
  }

  useEffect(() => {
    try {
      const getFavPlaylistsData = async () => {
        const { favorite } = await getUserDetail()
        if (favorite.playlists) {
          const data = await getUserPlaylists(favorite.playlists)

          setFavPlaylists(data)
        }
      }

      getFavPlaylistsData()
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  if (!currentUser) return null

  return (
    <div className='playlist-fav-container'>
      <div className='playlist-fav-title alcenter-jcbetween mt-12px'>
        <div className='playlist-fav-title-content common-title color-0-88'>{defineLang('Danh sách phát', 'Playlist')}</div>
        {favPlaylists.length !== 0 && isValid(favPlaylists) && (
          <div className='clear-all clickable small-common color-0-6' onClick={onHandleClearAllFav}>
            {defineLang('Xóa tất cả', 'Clear all')}
          </div>
        )}
      </div>
      <div className='playlist-fav-main pt2'>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {favPlaylists
            .slice()
            .reverse()
            .map((playlist) => playlist && (
              <Grid item key={playlist.key} xs={6} sm={4} md={4} lg={3} xl={2}>
                <CommonPlaylist {...playlist} keyId={playlist.key} addToFav={false} removeFav handleRemoveFav={() => handleRemoveFav(playlist.key)} />
              </Grid>
            ))}
        </Grid>
      </div>
      {favPlaylists.length === 0 && (
        <div className='no-fav-playlist h100'>
          <NotFoundV2 message={defineLang('Chưa có danh sách yêu thích nào', 'There are no favorite playlist added')} />
        </div>
      )}
    </div>
  )
}

export default PlaylistFav
