import React, { useState, useEffect } from 'react'

import { getExplore } from 'services/Explore'
import { karaCate } from 'share/Categories'
import { SongSquare, PagiCommon, LoadingV2, CateBasic, ErrorBoundary, CommonPlaylist, CommonVideo } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage, isFetchingFail } from 'share/utilities'
import { scrollToTop } from 'share'

const Karaoke = ({ defineLang, type }) => {
  const [kara, setKaraoke] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [curCate, setCurCate] = useState(karaCate[0].value)

  const handleCateChange = (newCate) => {
    setCurCate(newCate)
    setPageIndex(1)
    scrollToTop()
  }

  const cateBasicProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: karaCate,
  }

  useEffect(() => {
    const getKaraokeState = async () => {
      try {
        setIsLoading(true)
        const kara = await getExplore(type, curCate, pageIndex)
        isFetchingFail(kara.status, defineLang)

        setKaraoke(kara)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        throw new Error(error)
      }
    }

    getKaraokeState()
  }, [pageIndex, curCate, type])

  if (isLoading)
    return (
      <div className='kara-container common-marginTLR'>
        <div className='kara-cate pb-1-2'>
          <CateBasic {...cateBasicProps} />
        </div>
        <div className='loading-container'>
          <LoadingV2 />
        </div>
      </div>
    )

  if (!kara) return null

  const { data, total } = kara

  const pagiProps = {
    pageIndex,
    setPageIndex,
    count: calcPaginationPage(total),
    defineLang,
  }

  return (
    <div className='kara-container common-marginTLR'>
      <div className='kara-cate pb-1-2'>
        <CateBasic {...cateBasicProps} />
      </div>
      <ErrorBoundary>
        <div className='kara-main'>
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {data?.map((content) => (
              <Grid item key={content.key} xs={6} sm={4} md={4} lg={3} xl={2}>
                <CommonVideo {...content} keyId={content.key} />
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

export default Karaoke
