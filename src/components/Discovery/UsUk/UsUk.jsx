import React, { useState, useEffect } from 'react'

import { getExplore } from 'services/Explore'
import { defineCate, usukCate, usukPlaylistCate, usukVideoCate } from 'share/Categories'
import { SongSquare, PagiCommon, LoadingV2, CateBasic, ErrorBoundary, CommonPlaylist, CommonVideo } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage, isFetchingFail } from 'share/utilities'
import { scrollToTop } from 'share'

const UsUk = ({ defineLang, type }) => {
  const [usuk, setUsUk] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [curCate, setCurCate] = useState(defineCate(type, usukCate, usukPlaylistCate, usukVideoCate)[0].value)

  const handleCateChange = (newCate) => {
    setCurCate(newCate)
    setPageIndex(1)
    scrollToTop()
  }

  const cateBasicProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: defineCate(type, usukCate, usukPlaylistCate, usukVideoCate),
  }

  useEffect(() => {
    const getUsUkState = async () => {
      try {
        setIsLoading(true)
        const usuk = await getExplore(type, curCate, pageIndex)
        isFetchingFail(usuk.status, defineLang)

        setUsUk(usuk)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        throw new Error(error)
      }
    }

    getUsUkState()
  }, [pageIndex, curCate, type])

  if (isLoading)
    return (
      <div className='usuk-container common-marginTLR'>
        <div className='usuk-cate pb-1-2'>
          <CateBasic {...cateBasicProps} />
        </div>
        <div className='loading-container'>
          <LoadingV2 />
        </div>
      </div>
    )

  if (!usuk) return null

  const { data, total } = usuk

  const pagiProps = {
    pageIndex,
    setPageIndex,
    count: calcPaginationPage(total),
    defineLang,
  }

  return (
    <div className='usuk-container common-marginTLR'>
      <div className='usuk-cate pb-1-2'>
        <CateBasic {...cateBasicProps} />
      </div>
      <ErrorBoundary>
        <div className='usuk-main'>
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {data?.map((content) => (
              <Grid item key={content.key} xs={6} sm={4} md={4} lg={3} xl={2}>
                {type === 'song' && <SongSquare {...content} keyId={content.key} />}
                {type === 'playlist' && <CommonPlaylist {...content} keyId={content.key} />}
                {type === 'mv' && <CommonVideo {...content} keyId={content.key} />}
              </Grid>
            ))}
          </Grid>
        </div>
        {calcPaginationPage(total) > 1 && (
          <div className='common-marginTLR'>
            <PagiCommon {...pagiProps} />
          </div>
        )}
      </ErrorBoundary>
    </div>
  )
}

export default UsUk
