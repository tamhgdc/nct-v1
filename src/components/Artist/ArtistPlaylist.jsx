import React from 'react'

import { PagiCommon, ResultTitle, CommonPlaylist, Title } from 'components'
import Grid from '@mui/material/Grid'
import { calcPaginationPage } from 'share/utilities'

const ArtistPlaylist = ({ defineLang, pageIndex, setPageIndex, sort, setSort, playlist = {}, artist = {} }) => {
  const { playlist: playlists = [], total = 0 } = playlist
  const { name = '' } = artist

  const resultTitleProps = {
    defineLang,
    title: defineLang('Danh sách phát', 'Playlist'),
    total,
  }

  const pagiCommonProps = { pageIndex, setPageIndex, count: calcPaginationPage(total), defineLang }

  return (
    <div className='pt-16 px-32px'>
      <Title title={name ? `${name} | ${defineLang(`Danh sách phát nhất của ca sĩ ${name}`, `Best playlists of ${name} singer`)} - NhacCuaTui Clone` : 'NhacCuaTui Clone'} />
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
          {playlists.map((playlist) => (
            <Grid item key={playlist.key} xs={6} sm={4} md={4} lg={3} xl={2}>
              <CommonPlaylist {...playlist} keyId={playlist.key} />
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

export default ArtistPlaylist
