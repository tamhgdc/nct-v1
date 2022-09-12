import React, { useState, useEffect } from 'react'

import { getPlaylistResult } from 'services/Search/SearchResult'
import { PagiCommon, LoadingV2, CommonPlaylist, ResultTitle } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage } from 'share/utilities'

const PlaylistSearch = ({ searchTerm, searchQuery, defineLang }) => {
  const [playlistSearch, setPlaylistSearch] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getPlaylistSearchState = async () => {
      setIsLoading(true)
      const playlistResult = await getPlaylistResult(searchTerm || searchQuery, pageIndex)

      setPlaylistSearch(playlistResult)
      setIsLoading(false)
    }

    getPlaylistSearchState()
  }, [pageIndex])

  if (isLoading)
    return (
      <div className='search-result-loading'>
        <LoadingV2 />
      </div>
    )

  if (!playlistSearch) return null

  const { total } = playlistSearch

  const pagiProps = {
    pageIndex,
    setPageIndex,
    count: calcPaginationPage(total),
    defineLang,
  }

  const resultTitleProps = {
    defineLang,
    title: defineLang('Danh sách phát', 'Playlist'),
    total,
    styles: 'mb-24px'
  }

  return (
    <div className='playlist-search-container common-section common-paddingLR'>
      <ResultTitle {...resultTitleProps} />
      <div className='playlist-search-main'>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {playlistSearch?.playlist.map((playlist) => (
            <Grid item key={playlist.key} xs={6} sm={4} md={4} lg={3} xl={2}>
              <CommonPlaylist {...playlist} keyId={playlist.key} />
            </Grid>
          ))}
        </Grid>
      </div>
      {calcPaginationPage(total) > 1 && (
        <div className='common-marginTLR'>
          <PagiCommon {...pagiProps} />
        </div>
      )}
    </div>
  )
}

export default PlaylistSearch
