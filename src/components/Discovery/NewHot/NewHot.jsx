import React, { useState, useEffect } from 'react'

import { SongSquare, PagiCommon, LoadingV2, CommonPlaylist, CommonVideo } from 'components'
import { Grid } from '@mui/material'
import { calcPaginationPage, isFetchingFail } from 'share/utilities'
import { getExplore } from 'services/Explore'

const NewHot = ({ defineLang, type }) => {
  const [newHot, setNewHot] = useState(null)
  const [pageIndex, setPageIndex] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getNewHotState = async () => {
      setIsLoading(true)
      const newHot = await getExplore(type, 'moi-hot', pageIndex)
      isFetchingFail(newHot.status, defineLang)

      setNewHot(newHot)
      setIsLoading(false)
    }

    getNewHotState()
  }, [pageIndex, type])

  if (isLoading)
    return (
      <div className='loading-container'>
        <LoadingV2 />
      </div>
    )

  if (!newHot) return null

  const { data, total } = newHot

  const pagiProps = {
    pageIndex,
    setPageIndex,
    count: calcPaginationPage(total),
    defineLang,
  }

  return (
    <div className='new-hot-container common-section common-marginTLR' style={{ paddingTop: '2rem' }}>
      <div className='new-hot-title color-0-88 common-title pb-1-2'>{defineLang('Mới & Hot', 'New & Hot')}</div>
      <div className='new-hot-main'>
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
    </div>
  )
}

export default NewHot
