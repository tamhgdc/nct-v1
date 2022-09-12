import React, { useState, useEffect, useCallback } from 'react'

import { CommonPlaylist, Container, LoadingV2, MainColCate, NotFoundV2, PagiCommon, Title } from 'components'
import { useStore } from 'store'
import { IoIosCloseCircle } from 'react-icons/io'
import { getCollectionRes } from 'services/Playlist/Collection'
import { Grid } from '@mui/material'
import { calcPaginationPage } from 'share/utilities'

const Collection = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const [isLoading, setIsLoading] = useState(false)
  const [colCate, setColCate] = useState([])
  const [collection, setCollection] = useState({})
  const [pageIndex, setPageIndex] = useState(1)

  useEffect(() => {
    try {
      setIsLoading(true)

      const getCollectionState = async () => {
        const tags = colCate.map((cate) => cate.value.value).toString()
        const collection = await getCollectionRes(tags, pageIndex)

        setCollection(collection)
        setIsLoading(false)
      }

      getCollectionState()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [colCate, pageIndex])

  const handleAddColCate = (value, mainCate) => {
    const oldColCate = colCate.filter((collection) => collection.mainCate !== mainCate)

    setColCate([...oldColCate, { value, mainCate }])
    setPageIndex(1)
  }

  const handleRemoveColCate = (value) => {
    const newColCate = colCate.filter((collect) => collect.value.value !== value)

    setColCate(newColCate)
    setPageIndex(1)
  }

  const mainColCateProps = {
    defineLang,
    colCate,
    handleAddColCate,
  }

  const pagiProps = {
    pageIndex,
    setPageIndex,
    count: calcPaginationPage(collection?.total),
    defineLang,
  }

  return (
    <div className='collection-container commonMainOutlet'>
      <Title title={defineLang('Tuyển tập playlist hay nhất, chọn lọc theo tâm trạng - NhacCuaTui Clone', 'Best playlist collection, based on mood - NhacCuaTui Clone')} />
      <Container>
        <div className='pt-10 common-paddingLR relative'>
          <MainColCate {...mainColCateProps} />
          <div className='mt-16 font-bold color-0-88 text-md flex items-center'>
            {colCate.length === 0 ? defineLang('Tất cả tuyển tập', 'All Collections') : 'Tags: '}
            {colCate.map((cate) => {
              const { value } = cate

              return (
                <span key={value.value} className='flex items-center px-5 py-3 ml-3 bg-color-0-05 rounded-16px color-0-5'>
                  <span className='text-sm font-medium mr-2'>{defineLang(value.title.vi, value.title.en)}</span>
                  <IoIosCloseCircle className='cursor-pointer' onClick={() => handleRemoveColCate(value.value)} />
                </span>
              )
            })}
          </div>
          <div className='mt-11 mb-12'>
            {isLoading ? (
              <div className='flex justify-center items-center h-96'>
                <LoadingV2 />
              </div>
            ) : (
              <React.Fragment>
                <Grid container spacing={{ xs: 1, sm: 2 }}>
                  {collection?.playlist?.map((playlist) => (
                    <Grid item key={playlist.key} xs={6} sm={4} md={4} lg={3} xl={2}>
                      <CommonPlaylist {...playlist} keyId={playlist.key} />
                    </Grid>
                  ))}
                </Grid>
                {calcPaginationPage(collection?.total) > 1 && (
                  <div className='mt-11'>
                    <PagiCommon {...pagiProps} />
                  </div>
                )}
                {collection?.playlist?.length === 0 && <NotFoundV2 message={defineLang('Không tìm thấy chủ đề phù hợp', 'No matching topic found')} />}
              </React.Fragment>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Collection
