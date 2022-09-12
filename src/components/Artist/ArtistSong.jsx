import React from 'react'

import { PagiCommon, ResultTitle, SongSquare, Title } from 'components'
import Grid from '@mui/material/Grid'
import { calcPaginationPage } from 'share/utilities'

const ArtistSong = ({ defineLang, pageIndex, setPageIndex, sort, setSort, song = {}, artist = {} }) => {
  const { song: songs = [], total = 0 } = song
  const { name = '' } = artist

  const resultTitleProps = {
    defineLang,
    title: defineLang('Bài hát', 'Song'),
    total,
  }

  const pagiCommonProps = { pageIndex, setPageIndex, count: calcPaginationPage(total), defineLang }
  
  return (
    <div className='pt-16 px-32px'>
      <Title title={name ? `${name} | ${defineLang(`Bài hát hay nhất của ca sĩ ${name}`, `Best songs of ${name} singer`)} - NhacCuaTui Clone` : 'NhacCuaTui Clone'} />
      <div className='flex items-center justify-between'>
        <ResultTitle {...resultTitleProps} />
        <div className='text-sm color-0-88'>
          <span className={`cursor-pointer text-13px font-medium ${sort === 1 ? 'text-main' : ''}`} onClick={() => setSort(1)}>
            New
          </span>
          {' | '}
          <span className={`cursor-pointer text-13px font-medium ${sort === 0 ? 'text-main' : ''}`} onClick={() => setSort(0)}>
            Hot
          </span>
        </div>
      </div>
      <div className='mt-24px'>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {songs.map((song) => (
            <Grid item key={song.key} xs={6} sm={4} md={4} lg={3} xl={2}>
              <SongSquare {...song} keyId={song.key} backupImg={song.artists?.[0]?.imageUrl} />
            </Grid>
          ))}
        </Grid>
      </div>
      {calcPaginationPage(total) > 1 && (
        <div className="mt-24px px-32px">
          <PagiCommon {...pagiCommonProps} />
        </div>
      )}
    </div>
  )
}

export default ArtistSong
