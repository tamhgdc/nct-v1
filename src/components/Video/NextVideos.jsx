import React from 'react'

import { BallCheckbox, VideoRow } from 'components'
import Grid from '@mui/material/Grid'

const NextVideos = ({ defineLang, videoDetail, autoplay, toggleAutoplay, windowWidth }) => {

  const { maybeLike = {} } = videoDetail
  const { data: rcmVideos = [] }  = maybeLike

  if (rcmVideos.length === 0 || windowWidth < 600) return null
  
  return (
    <div className='w-[33.6rem] mx-16px '>
      <div className='flex relative items-center'>
        <div className='flex items-center'>
          <div className='text-xl color-0-88 font-bold'>{defineLang('Nghe tiếp', 'Play next')}</div>
          <div className='absolute right-0 flexCenter'>
            <p className='text-13px color-0-5 uppercase mr-8px font-normal'>{defineLang('Tự động phát', 'Autoplay')}</p>
            <BallCheckbox title='autoplay' isActive={autoplay} handleClick={toggleAutoplay} />
          </div>
        </div>
      </div>
      <div className="mt-16px">
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {rcmVideos.map(video => (
            <Grid key={video.key} item xs={12} sm={12} md={12} lg={12} xl={12}>
              <VideoRow { ... video } keyId={video.key} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default NextVideos
