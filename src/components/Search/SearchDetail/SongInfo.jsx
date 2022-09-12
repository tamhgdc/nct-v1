import React, { useState, useEffect } from 'react'

import { getListSongsKey, getSongsView } from 'share/utilities'
import { Grid } from '@mui/material'
import { CommonSong } from 'components'

const SongInfo = ({ songs = [], defineLang }) => {
  const [songsView, setSongView] = useState({})

  useEffect(() => {
    try {
      const getSongsViewState = async (listSongsKey) => {
        const songsView = await getSongsView(listSongsKey)
        setSongView(songsView)
      }
      getSongsViewState(getListSongsKey(songs))
    } catch (error) {
      throw new Error(error)
    }
  }, [songs])

  if (songs.length === 0) return null

  return (
    <div className='song-info-container common-section'>
      <div className='si-title pt0-lr3-2 common-title color-0-88'>{defineLang('Bài hát', 'Song')}</div>
      <div className='song-info-main common-main'>
        <Grid className='list-songs' container spacing={{ xs: 1, sm: 2 }}>
          {songs.map((song) => (
            <Grid key={song.key} item xs={12} sm={6} md={6} lg={6} xl={4}>
              <CommonSong {...song} songView={songsView[song.key] || 0} keyId={song.key} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default SongInfo
