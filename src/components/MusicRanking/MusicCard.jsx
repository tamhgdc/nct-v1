import React, { useState, useEffect, memo } from 'react'
import { Link } from 'react-router-dom'
import { BsPlayCircleFill } from 'react-icons/bs'

import { detectZ } from 'services/MusicCard'
import { createSongUrl, createTop20Url, handlePlayNewSong } from 'share/utilities'
import { CommonArtist } from 'components'
import { deepCopy } from 'share'

const MusicCard = ({ region, song, bgImage, category, defineLang, actions, dispatch, curPlaylist }) => {
  const [topThreeSong, setTopThreeSong] = useState([])
  const [activeSong, setActiveSong] = useState({})

  const { position, title, songKey, artists } = activeSong

  useEffect(() => {
    if (song) {
      const topSong = deepCopy(song)
      setTopThreeSong(topSong.slice(0, 3))
      setActiveSong(topSong[0])
    }
  }, [])

  const handleChangeActiveSong = (index) => {
    setActiveSong(topThreeSong[index])
  }

  return (
    <div className='ma-container ip5:w-full sm:w-1/3 sm:pr-16px sm:last:pr-0 sm:mt-0 ip5:mt-6 ip5:h-360px sm:h-340px'>
      <div className='bg-color-0-02 relative w-full h-full rounded-4px'>
        <div className='ma-bg-img' style={{ backgroundImage: `url(${bgImage})` }}></div>
        <div className='ma-title'>{defineLang(region.vi, region.en)}</div>
        <div className='ma-t3-img'>
          {topThreeSong.map((song, index) => {
            const { songKey, thumbnail, title } = song

            return (
              <div
                key={songKey}
                className='ma-thumb-container md:w-32 md:h-32 ip5:w-28 ip5:h-28'
                style={{
                  backgroundImage: `url(${thumbnail})`,
                  zIndex: detectZ(index),
                }}
                onMouseEnter={() => {
                  handleChangeActiveSong(index)
                }}
                onClick={() => handlePlayNewSong(songKey, dispatch, actions, curPlaylist, true, defineLang)}
                title={title}
              >
                <div className='ma-thumb-icon flex items-center justify-center'>
                  <BsPlayCircleFill />
                </div>
                <div className='ma-blur'></div>
              </div>
            )
          })}
        </div>
        <div className='ma-active-position color-0-05'>#{position}</div>
        <div className='ma-active-title'>
          <Link to={createSongUrl(title, songKey)}>{title}</Link>
        </div>
        <CommonArtist styles='px-24px' artists={artists} />
        <div className='ma-watch-all border-0-1 color-0-5'>
          <Link to={createTop20Url(category)}>{defineLang('Xem tất cả', 'Full Chart')}</Link>
        </div>
      </div>
    </div>
  )
}

export default memo(MusicCard)
