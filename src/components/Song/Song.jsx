import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

import { getSongsView, getListSongsKey } from 'share/utilities'

import { useStore, actions } from 'store'
import { Grid } from '@mui/material'
import { CommonSong } from 'components'

const Song = ({ song: songList = [] }) => {
  const [state, dispatch] = useStore()
  const { lang, curPlaylist } = state
  const defineLang = useCallback((vie, eng) => (lang === 'vi' ? vie : eng), [lang])

  const [songsView, setSongView] = useState({})

  useEffect(() => {
    try {
      if (songList) {
        const getSongsViewState = async (listSongsKey) => {
          const songsView = await getSongsView(listSongsKey)
          setSongView(songsView)
        }

        getSongsViewState(getListSongsKey(songList))
      }
    } catch (error) {
      throw new Error(error)
    }
  }, [songList])

  if (!songList) return null

  const songDetailProps = {
    actions,
    dispatch,
    curPlaylist,
    defineLang,
  }

  return (
    <div className='so-container'>
      <div className='mt-16 ml-32px main-title'>
        <Link to='/kham-pha/moi-hot'>{defineLang('Bài hát', 'Song')}</Link>
      </div>
      <div
        className='mt-16px mx-32px'
      >
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {songList.map((song) => (
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={song.key} className='!py-2px'>
              <CommonSong {...song} songView={songsView[song.key] || 0} keyId={song.key} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default Song
