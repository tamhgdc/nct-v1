import React, { useState, useEffect } from 'react'

import { getVideoResult } from 'services/Search/SearchResult'
import { PagiCommon, LoadingV2, CommonVideo, ResultTitle } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage } from 'share/utilities'

const VideoSearch = ({ searchTerm, searchQuery, defineLang }) => {
  const [videoSearch, setVideoSearch] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getVideoSearchState = async () => {
      setIsLoading(true)
      const videoResult = await getVideoResult(searchTerm || searchQuery, pageIndex)

      setVideoSearch(videoResult)
      setIsLoading(false)
    }

    getVideoSearchState()
  }, [pageIndex])

  if (isLoading)
    return (
      <div className='search-result-loading'>
        <LoadingV2 />
      </div>
    )

  if (!videoSearch) return null

  const { total } = videoSearch

  const pagiProps = {
    pageIndex,
    setPageIndex,
    count: calcPaginationPage(total),
    defineLang,
  }

  const resultTitleProps = {
    defineLang,
    title: 'Video',
    total,
    styles: 'mb-24px'
  }

  return (
    <div className='video-search-container common-section common-paddingLR'>
      <ResultTitle {...resultTitleProps} />
      <div className='video-search-main'>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {videoSearch?.video.map((video) => (
            <Grid item key={video.key} xs={6} sm={4} md={4} lg={4} xl={3}>
              <CommonVideo {...video} keyId={video.key} />
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

export default VideoSearch
