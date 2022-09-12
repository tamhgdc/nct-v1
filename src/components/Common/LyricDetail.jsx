import React, { useState, useRef } from 'react'
import parse from 'html-react-parser'
import LineBreak from './LineBreak'
import Button from '@mui/material/Button'

import { AiOutlineCopy } from 'react-icons/ai'
import { handleCopyLyric } from 'share/utilities'

const LyricDetail = ({ defineLang, styles = '', lyric = {} }) => {
  const [showLyric, setShowLyric] = useState(false)

  const toggleShowLyric = () => {
    setShowLyric(!showLyric)
  }

  const lyricRef = useRef(null)

  if (!lyric) return null
  if (!lyric.lyric) return null
  
  return (
    <div className={`relative w-full rounded-4px bg-color-0-02 mt-4px pt-18px px-24px pb-54px overflow-hidden ${styles}`}>
      <React.Fragment>
        <div className='absolute right-24px'>
            <Button className='bg-color-0-05 color-0-5 text-13px normal-case' startIcon={<AiOutlineCopy />} onClick={() => handleCopyLyric(lyricRef.current.innerText, defineLang)}>
              {defineLang('Sao chép', 'Copy')}
            </Button>
          </div>
        <div className='text-sm font-semibold color-0-88'>{defineLang('Lời bài hát', 'Lyrics')}</div>
        <div className='text-13px color-0-5 mt-4'>
          {defineLang('Lời đăng bởi: ', 'Edited by: ')}
          {lyric.userNameUpload}
        </div>
        <LineBreak styles='mt-16px' />
        <pre ref={lyricRef} className={`font-mons leading-loose relative mt-24px text-sm color-0-88 transition-height will-change-height ${showLyric ? 'max-h-fit' : 'h-32 line-clamp-4'}`}>
          {parse(lyric.lyric)}
        </pre>
      </React.Fragment>

      <div className='absolute bottom-24px color-0-5 cursor-pointer clickable' onClick={toggleShowLyric}>
        {defineLang('Xem thêm', 'Load more')}
      </div>
    </div>
  )
}

export default LyricDetail
