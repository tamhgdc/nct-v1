import React from 'react'
import './TopResult.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import { SlideNextButton, SlidePrevButton } from 'components/CustomNav/CustomNav'
import 'swiper/scss'

import { topResultSwiperProps } from 'services/Search/SearchResult'
import { PlaylistResult, TopSongResult } from 'components'

const TopResult = ({ playlist, song, defineLang, isLoading, favPlaylists }) =>
  isLoading || (
    <div className='top-result-container'>
      <Swiper className='tr-swiper' {...topResultSwiperProps}>
        <div className='tr-title'>
          <div className='tr-title-lead color-0-88'>{defineLang('Top tìm kiếm', 'Top Result')}</div>
          <div className='custom-arrow-container color-0-6'>
            <SlidePrevButton />
            <SlideNextButton />
          </div>
        </div>
        {playlist && (
          <React.Fragment>
            {playlist.map((pl) => (
              <SwiperSlide key={pl.key}>
                <PlaylistResult playlist={pl} defineLang={defineLang} favPlaylists={favPlaylists} />
              </SwiperSlide>
            ))}
          </React.Fragment>
        )}
        {song && (
          <React.Fragment>
            {song.map((sg) => (
              <SwiperSlide key={sg.key}>
                <TopSongResult song={sg} defineLang={defineLang} />
              </SwiperSlide>
            ))}
          </React.Fragment>
        )}
      </Swiper>
    </div>
  )

export default TopResult
