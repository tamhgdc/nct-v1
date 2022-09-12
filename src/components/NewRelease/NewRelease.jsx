import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './NewRelease.scss'
import backupImg from 'images/default/default_song.png'
import backupArtist from 'images/default/default_artist.png'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

import { GoCalendar } from 'react-icons/go'
import { BsPlayCircleFill } from 'react-icons/bs'

import { covertTimestamp, createArtistUrl, createSongUrl } from 'share/utilities'
import { activeSlideSettings, thumbSlideSettings } from 'services/NewRelease'

import { useStore } from 'store'
import { CircleTitleArtist, Image } from 'components'

const NewRelease = ({ newRelease: { song: newSong } }) => {
  const [state] = useStore()
  const { lang } = state

  const [slide, setSlide] = useState({
    activeSlide: null,
    thumbSlide: null,
  })

  const activeSlideRef = useRef(null)
  const thumbSlideRef = useRef(null)

  useEffect(() => {
    setSlide({
      activeSlide: activeSlideRef.current,
      thumbSlide: thumbSlideRef.current,
    })
  }, [])

  return (
    <div className='nr-container'>
      <Link to='/bai-hat' className='ml-32px main-title hoverMainColor'>
        {lang === 'vi' ? 'Mới phát hành' : 'New Releases'}
      </Link>
      <div className='nr-main'>
        <div className='nr-active-slide md:h-200px sm:h-160px ip5:140px bg-color-0-02'>
          <Slider {...activeSlideSettings} asNavFor={slide.thumbSlide} ref={activeSlideRef}>
            {newSong.map((song) => {
              const { key, artists, dateRelease, thumbnail, title } = song

              const imageProps = {
                imageUrl: thumbnail,
                alt: title,
                backupImg,
              }

              return (
                <div key={key} className='nr-active-container'>
                  <Link to={createSongUrl(title, key)} className='nr-active-img md:w-160px md:h-160px sm:w-140px sm:h-140px ip5:w-120px ip5:h-120px  sm:mr-16 ip5:mr-8' title={title}>
                    <Image {...imageProps} />
                  </Link>
                  <div className='nr-active-detail'>
                    <Link to={createSongUrl(title, key)}>
                      <h4 className='color-0-88 sm:text-sm ip5:text-13px'>{title}</h4>
                    </Link>
                    <CircleTitleArtist artists={artists} titleStyles='sm:ml-8px ip5:ml-4px' />
                    <div className='nr-date-release sm:text-sm ip5:text-13px color-0-5'>
                      <GoCalendar />
                      <span>
                        {lang === 'vi' ? 'Ngày phát hành' : 'Released date'}: {covertTimestamp(dateRelease)}
                      </span>
                    </div>
                    <div className='line-throught'></div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
      <div className='nr-thumb-slider ip5:px-8 sm:px-0'>
        <Slider {...thumbSlideSettings} asNavFor={slide.activeSlide} ref={thumbSlideRef}>
          {newSong.map((song) => {
            const { key, thumbnail, title } = song

            const imageProps = {
              imageUrl: thumbnail,
              alt: title,
              backupImg,
              className: 'ip5:w-20 sm:w-80px',
            }
            return (
              <Link key={key} to={createSongUrl(title, key)} className='nr-thumb-img ip6:px-6px ip5:px-2px' title={title}>
                <Image {...imageProps} />
                <div className='blur-layer ip5:w-20 sm:w-80px'>
                  <BsPlayCircleFill />
                </div>
              </Link>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default NewRelease
