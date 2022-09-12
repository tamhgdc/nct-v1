import React, { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import { getUserVideos } from 'services/User/User'
import { getUserDetail, handleClearAllFav, removeFavItem } from 'services/firebase/firestore'
import { CommonVideo, NotFoundV2 } from 'components'
import { isValid } from 'share/utilities'

const VideoFav = ({ defineLang, currentUser }) => {
  const [favVideos, setFavVideos] = useState([])

  const onHandleClearAllFav = async () => {
    await handleClearAllFav('videos', defineLang)
    setFavVideos([])
  }

  const handleRemoveFav = async (keyId) => {
    const { favorite } = await getUserDetail()

    const videoToRemove = favorite.videos.filter((videoId) => videoId === keyId)[0]

    await removeFavItem(videoToRemove, 'video', defineLang)
    setFavVideos(favVideos.filter((video) => video.key !== keyId))
  }

  useEffect(() => {
    try {
      const getFavVideosData = async () => {
        const { favorite } = await getUserDetail()
        if (favorite.videos) {
          const data = await getUserVideos(favorite.videos)

          setFavVideos(data)
        }
      }

      getFavVideosData()
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  if (!currentUser) return null

  return (
    <div className='relative'>
      <div className='flex justify-between items-center mb-6 color-0-88 mt-12px'>
        <div className='text-xl font-semibold'>Video</div>
        {favVideos.length !== 0 && isValid(favVideos) && (
          <div className='text-xs color-0-6 font-medium transition-colors hover:!text-main cursor-pointer' onClick={onHandleClearAllFav}>
            {defineLang('Xóa tất cả', 'Clear all')}
          </div>
        )}
      </div>
      <div className='pt2'>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {favVideos
            .slice()
            .reverse()
            .map(
              (video) =>
                video && (
                  <Grid item key={video.key} xs={6} sm={4} md={4} lg={4} xl={3}>
                    <CommonVideo {...video} keyId={video.key} addToFav={false} removeFav handleRemoveFav={() => handleRemoveFav(video.key)} />
                  </Grid>
                )
            )}
        </Grid>
      </div>
      {favVideos.length === 0 && (
        <div className='h100'>
          <NotFoundV2 message={defineLang('Chưa có video yêu thích nào', 'There are no favorite video added')} />
        </div>
      )}
    </div>
  )
}

export default VideoFav
