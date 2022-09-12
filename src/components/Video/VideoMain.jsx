import React from 'react'
import { useNavigate } from 'react-router-dom'
import back_up_video_img from 'images/default/default_video.png'

import { Player } from 'react-tuby'
import 'react-tuby/css/main.css'

import { CircleTitleArtist, LyricDetail, Provider, Sharing, UploadBy, ViewDate } from 'components'
import { IconButton, Tooltip } from '@mui/material'
import { BsBookmarkPlus } from 'react-icons/bs'
import { handleAddToFavVideo } from 'share/addToFav'
import { createVideoUrl, getCurrentPathname, handleCopyProxy, handleSourceUrl } from 'share/utilities'
import { toastNotify } from 'share/toast'

const VideoMain = ({ defineLang, videoDetail, autoplay, windowWidth }) => {
  const navigate = useNavigate()

  const { key = '', streamUrls = [], thumbnail, title, artists = [], videoView = {}, dateRelease = 0, uploadBy = {}, provider = {}, lyric = {}, maybeLike = {} } = videoDetail

  const handleNextVideo = () => {
    if (autoplay && maybeLike.data) {
      const nextVideo = maybeLike.data[0]
      const { key = '', title = '', artists = [] } = nextVideo

      navigate(createVideoUrl(key, title, artists))
    }
  }

  const playerProps = {
    src: handleSourceUrl(streamUrls),
    poster: thumbnail || back_up_video_img,
    pictureInPicture: true,
  }

  const handleCopyShare = () => {
    handleCopyProxy(defineLang, getCurrentPathname())
  }

  const onShareWindowClose = () => {
    toastNotify(defineLang('Chia sẻ lên facebook thành công', 'Share to facebook successfully'), 'success')
  }

  const sharingProps = { defineLang, placement: 'top', handleCopyShare, onShareWindowClose, shareLink: getCurrentPathname(), shareClass: 'ml-8px' }

  return (
    <div className={`${windowWidth > 600 ? 'w-[calc(100%_-_35.2rem)]' : 'w-full'} transition-all duration-300`}>
      <div className='relative w-full'>
        <div className='text-sm bg-color-0-05'>{streamUrls.length === 0 || <Player {...playerProps}>
          {(ref, props) => <video ref={ref} {...props} autoPlay onCanPlay={(e) => e.target.play()} onEnded={handleNextVideo} />}
        </Player>}</div>
        <div>
          <div className='text-md w-fit color-0-88 mt-16px font-semibold' title={title}>
            {title}
          </div>
          <CircleTitleArtist circleStyles='float-left' titleStyles='!mt-unset ml-8px' artists={artists} />
          {videoView && videoView[key] && <ViewDate view={videoView[key]} dateRelease={dateRelease} defineLang={defineLang} />}
          <UploadBy uploadBy={uploadBy} defineLang={defineLang} />
          <div className='w-full h-64px rounded-4px bg-color-0-02 mt-24px px-24px py-12px flex justify-between'>
            <Provider provider={provider || {}} defineLang={defineLang} />
            <div className='flex items-center'>
              <Tooltip title={defineLang('Thêm vào yêu thích', 'Add to favorite')} placement='top' arrow enterDelay={400}>
                <IconButton size='large' onClick={() => handleAddToFavVideo(key, defineLang)}>
                  <BsBookmarkPlus />
                </IconButton>
              </Tooltip>
              <Sharing {...sharingProps} />
            </div>
          </div>
          <LyricDetail lyric={lyric} defineLang={defineLang} />
        </div>
      </div>
    </div>
  )
}

export default VideoMain
