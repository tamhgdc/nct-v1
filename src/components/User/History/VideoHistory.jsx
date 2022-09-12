import React, { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import { getUserVideos } from 'services/User/User'
import { getUserDetail, handleClearAllHistory, removeHistoryItem } from 'services/firebase/firestore'
import { CommonVideo, NotFoundV2 } from 'components'
import { isValid } from 'share/utilities'

const VideoHistory = ({ defineLang, currentUser }) => {
  const [historyVideos, setHistoryVideos] = useState([])

  const onHandleClearAllHistory = async () => {
    await handleClearAllHistory('videos', defineLang)
    setHistoryVideos([])
  }

  const handleRemoveHistory = async (keyId) => {
    const { history } = await getUserDetail()

    const videoToRemove = history.videos.filter((videoId) => videoId === keyId)[0]

    await removeHistoryItem(videoToRemove, 'video', defineLang)
    setHistoryVideos(historyVideos.filter((video) => video.key !== keyId))
  }

  useEffect(() => {
    try {
      const getHistoryVideosData = async () => {
        const { history } = await getUserDetail()
        if (history.videos) {
          const data = await getUserVideos(history.videos)

          setHistoryVideos(data)
        }
      }

      getHistoryVideosData()
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  if (!currentUser) return null

  return (
    <div className='relative'>
      <div className='flex justify-between items-center mb-6 color-0-88'>
        <div className='text-xl font-semibold'>Video</div>
        {historyVideos.length !== 0 && isValid(historyVideos) && (
          <div className='text-xs color-0-6 font-medium transition-colors hover:!text-main cursor-pointer' onClick={onHandleClearAllHistory}>
            {defineLang('Xóa tất cả', 'Clear all')}
          </div>
        )}
      </div>
      <div className='pt2'>
        <Grid container spacing={{ xs: 1, sm: 2 }}>
          {historyVideos
            .slice()
            .reverse()
            .map(
              (video) =>
                video && (
                  <Grid item key={video.key} xs={6} sm={4} md={4} lg={4} xl={3}>
                    <CommonVideo {...video} keyId={video.key} addToFav={false} removeHistory handleRemoveHistory={() => handleRemoveHistory(video.key)} />
                  </Grid>
                )
            )}
        </Grid>
      </div>
      {historyVideos.length === 0 && (
        <div className='h100'>
          <NotFoundV2 message={defineLang('Bạn chưa xem video nào.', "You haven't watched any videos yet.")} />
        </div>
      )}
    </div>
  )
}

export default VideoHistory