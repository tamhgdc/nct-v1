import React, { useState, useEffect } from 'react'

import { getSongResult } from 'services/Search/SearchResult'
import { SongSquare, PagiCommon, LoadingV2, ResultTitle } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage } from 'share/utilities'

const SongResult = ({ searchTerm, searchQuery, defineLang }) => {
  const [songResult, setSongResult] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getSongResultState = async () => {
      setIsLoading(true)
      const songResult = await getSongResult(searchTerm || searchQuery, pageIndex)

      setSongResult(songResult)
      setIsLoading(false)
    }

    getSongResultState()
  }, [pageIndex])

  if (isLoading)
    return (
      <div className='search-result-loading'>
        <LoadingV2 />
      </div>
    )

  if (!songResult) return null

  const { total } = songResult

  const pagiProps = {
    pageIndex,
    setPageIndex,
    count: calcPaginationPage(total),
    defineLang,
  }

  const resultTitleProps = {
    defineLang,
    title: defineLang('Bài hát', 'Song'),
    total,
    styles: 'mb-24px'
  }

  return (
    <div className='song-result-container common-section common-paddingLR'>
      <ResultTitle {...resultTitleProps} />
      <div className='song-result-main'>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {songResult?.song.map((song) => (
            <Grid item key={song.key} xs={6} sm={4} md={4} lg={3} xl={2}>
              <SongSquare {...song} keyId={song.key} />
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

export default SongResult
