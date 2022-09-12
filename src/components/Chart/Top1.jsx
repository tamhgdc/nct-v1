import React from 'react'

import { CircleTitleArtist, LineBreak, RankPosition } from 'components'
import useWindowSize from 'hooks/useWindowSize'

const Top1 = ({ artists, highestPosition, oldPosition, thumbnail, title, totalWeekInRanked, isVideo, defineLang }) => {
  const size = useWindowSize()

  const rankPositionProps = {
    highestPosition,
    oldPosition,
    totalWeekInRanked,
    defineLang,
  }

  return (
    <div className='mt-16px h-[20.8rem] bg-color-0-02 pt-20px pr-32px pb-22px pl-40px'>
      <div className='w3-row relative w-full h-full pt-6px'>
        <div className='absolute top-0 w-48px h-22px leading-22px rounded-tr-4px rounded-bl-4px bg-hot text-10px font-bold text-center uppercase text-slate-50'>Top 1</div>
        <div className={`w3-col sm:w-160px ip5:w-120px ip6:w-140px sm:h-160px ip5:h-120px ip6:h-140px useBorder border-0-1 rounded-4px shadow-md transition-width will-change-auto ${isVideo ? 'sm:w-[284px] ip5:w-180px ip6:w-200px' : ''}`}>
          <div className='w-full h-full bg-cover bg-no-repeat rounded-4px' style={{ backgroundImage: `url(${thumbnail})` }}></div>
        </div>
        <div className='w3-rest ip5:pl-12px ip6:pl-8 sm:pl-40px'>
          <div className='w3-row mt-16px flex'>
            <div className='w3-col w-fit text-13px color-0-5 mr-6px flex items-end font-normal'>{isVideo ? 'Video:' : defineLang('Bài hát:', 'Song:')}</div>
            <div className='w3-rest text-sm font-semibold flex items-end'>{title}</div>
          </div>
          <CircleTitleArtist circleStyles='float-left' titleStyles='!mt-unset ml-8px' artists={artists} />
          <LineBreak styles='sm:mt-16px ip5:mt-6px' />
          {size.width > 600 && (
            <div className='sm:mt-16px ip5:mt-6px'>
              <RankPosition {...rankPositionProps} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Top1
