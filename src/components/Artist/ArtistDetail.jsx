import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { ArtistCover, CateCommon, Container, LoadingV2, ArtistHome, ArtistSong, ArtistPlaylist, ArtistVideo, ArtistIntro } from 'components'
import { getArtistDetailData } from 'services/Artist/Artist'

import { useStore } from 'store'
import { artistDetailCate } from 'share/Categories'

const ArtistDetail = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])
  const params = useParams()

  const [artistDetail, setArtistDetail] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const [curCate, setCurCate] = useState(artistDetailCate[0].value)
  const [pageIndex, setPageIndex] = useState(1)
  const [sort, setSort] = useState(0)

  const handleCateChange = (e, newCate) => {
    setCurCate(newCate)
    setPageIndex(1)
    if (newCate === 'all' || newCate === 'description') {
      setSort(0)
    } else {
      setSort(1)
    }
  }

  useEffect(() => {
    try {
      setIsLoading(true)
      const getArtistDetailState = async () => {
        const size = artistDetailCate.filter((cate) => cate.value === curCate)[0].size
        const artistDetail = await getArtistDetailData(params.artistName, curCate, size, pageIndex, sort)

        setArtistDetail(artistDetail)
        setIsLoading(false)
      }

      getArtistDetailState()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [params.artistName, curCate, pageIndex, sort])

  if (isLoading)
    return (
      <div className='commonMainOutlet flexCenter h-full'>
        <LoadingV2 />
      </div>
    )

  const { artist = {} } = artistDetail
  const { coverImageURL = '', imageUrl = '', name = '' } = artist

  const artistCoverProps = {
    coverImageURL,
    imageUrl,
    name,
  }

  const cateCommonProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: artistDetailCate,
  }

  const artistProps = {
    defineLang,
    ...artistDetail,
  }

  const commonProps = {
    pageIndex,
    setPageIndex,
    sort,
    setSort,
  }

  return (
    <div className='commonMainOutlet'>
      <Container>
        <div className='flex flex-col justify-center'>
          <div className='px-16 mt-24px'>
            <ArtistCover {...artistCoverProps} />
          </div>
          <div className='mt-24px'>
            <CateCommon {...cateCommonProps} cateStyles='normal-case !text-sm' />
            {curCate === 'all' && <ArtistHome {...artistProps} />}
            {curCate === 'song' && <ArtistSong {...artistProps} {...commonProps} />}
            {curCate === 'playlist' && <ArtistPlaylist {...artistProps} {...commonProps} />}
            {curCate === 'video' && <ArtistVideo {...artistProps} {...commonProps} />}
            {curCate === 'description' && <ArtistIntro {...artistProps} />}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ArtistDetail
