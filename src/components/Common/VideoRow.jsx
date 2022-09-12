import React from 'react'
import { Link } from 'react-router-dom'
import no_video_img from 'images/default/default_video.png'

import { createVideoUrl } from 'share/utilities'
import Image from './Image'
import CommonArtist from './CommonArtist/CommonArtist'

const VideoRow = ({ keyId = '', title = '', artists = [], thumbnail = '', duration = '' }) => {
  return (
    <div className='w3-row relative w-full h-auto'>
      <Link to={createVideoUrl(keyId, title, artists)}>
        <div className='relative w-64 h-36 useBorder border-0-05 w3-col rounded-4px mr-16px'>
          <Image className='absolute top-0 rounded-4px w-full h-full' imageUrl={thumbnail} backupImg={no_video_img} />
          <div className='absolute right-0 bottom-0 font-medium h-16px pl-14px pr-2px text-10px text-slate-100 bg-duration rounded-br-4px'>{duration}</div>
        </div>
      </Link>
      <div className='w3-rest'>
        <Link title={title} className='w-fit max-w-full mt-8px font-sm font-semibold color-0-88 line-clamp-2 text-sm hoverMainColor transition-colors' to={createVideoUrl(keyId, title, artists)}>
          {title}
        </Link>
        <CommonArtist artists={artists} styles='mb-4px' />
      </div>
    </div>
  )
}

export default VideoRow
