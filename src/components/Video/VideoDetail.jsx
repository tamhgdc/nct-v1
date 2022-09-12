import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import { useStore } from 'store'
import { LeftSidebar, LoadingV2, VideoMain, Title, NextVideos, Container } from 'components'
import { getVideoDetailData, getVideoStreamUrls } from 'services/Video/VideoDetail'
import { createTitleArtist, getLyricData, getMaybeLike, getVideosView } from 'share/utilities'
import { addVideoHistory } from 'services/firebase/firestore'
import useWindowSize from 'hooks/useWindowSize'

const VideoDetail = () => {
  const size = useWindowSize()
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const params = useParams()
  const query = new URLSearchParams(params.videoId)

  const [videoDetail, setVideoDetail] = useState({})
  const [autoplay, setAutoplay] = useState(true)

  const toggleAutoplay = useCallback(() => {
    setAutoplay(!autoplay)
    localStorage.setItem('autoplay', autoplay)
  }, [autoplay])

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true)
      const getVideoDetailState = async () => {
        const videoDetail = await getVideoDetailData(query.get('k'))

        const { key = '' } = videoDetail

        videoDetail.videoView = await getVideosView(key)
        videoDetail.streamUrls = await getVideoStreamUrls(key)
        videoDetail.lyric = await getLyricData(key, 'video')
        videoDetail.maybeLike = await getMaybeLike(key, 'video')

        setVideoDetail(videoDetail)
        setIsLoading(false)
      }

      getVideoDetailState()
      addVideoHistory(query.get('k'))
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [params.videoKey, query.get('k')])

  useEffect(() => {
    const localAutoplay = localStorage.getItem('autoplay')

    if (localAutoplay === 'true') {
      setAutoplay(true)
    } else if (localAutoplay === 'false') {
      setAutoplay(false)
    } else {
      localStorage.setItem('autoplay', false)
    }
  }, [])

  const videoProps = {
    defineLang,
    videoDetail,
    autoplay,
    windowWidth: size.width
  }

  const { artists = [], title = '' } = videoDetail

  return (
    <div className='hp-container bg-color-1'>
      {artists.length !== 0 && <Title title={createTitleArtist(title, artists)} />}
      <div className='h-full bg-color-0-02'>
        <LeftSidebar />
        {isLoading ? (
          <div className='ml-8 flexCenter h-screen'>
            <LoadingV2 />
          </div>
        ) : (
          <div className='commonMainOutlet mr-unset transition-none'>
            <Container>
              <div className='common-min-h h-full'>
                <div className={`${size.width > 600 ? 'ml-32px' : 'ml-12px mr-12px'} `}>
                  <div className='flex pt-24px'>
                    <VideoMain {...videoProps} />
                    <NextVideos {...videoProps} toggleAutoplay={toggleAutoplay} />
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoDetail
