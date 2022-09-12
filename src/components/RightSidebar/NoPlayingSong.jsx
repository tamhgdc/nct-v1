import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import noPlayer from 'images/default/default_player_v2.jpg'

import { getTrendingSong } from 'services/RightSidebar/NoPlayingSong'
import { createArtistUrl, createPlaylistUrl, createSongUrl, createTop20Url, createVideoUrl } from 'share/utilities'

const MainContainer = ({ defineLang, children, showRightSidebar, rightSidebarRef }) => (
  <div className={`rb-container bg-color-1 h-screen w-320px fixed top-0 ip5:-right-200vh xl:right-0 z-9 transition-all duration-300 border-l border-solid border-0-05 ${showRightSidebar && '!right-0'}`} ref={rightSidebarRef}>
    <div className='rb-suggestion border-0-05'>
      <div className='no-playing-song'>
        <div className='main'>
          <img src={noPlayer} alt={defineLang('Thưởng thức nhạc thôi nào!', 'Play music and enjoy')} />
          <p className='title color-0-88'>{defineLang('Thưởng thức những giai điệu theo cách riêng của bạn', 'Enjoy the melody in your own way')}</p>
          <div className='play-now border-0-1 color-0-5'>
            <Link to={createTop20Url('nhac-viet')}>{defineLang('Nghe nào', 'Play now')}</Link>
          </div>
        </div>
      </div>
      {children}
    </div>
  </div>
)

const NoPlayingSong = ({ defineLang }) => {
  const [trendingSong, setTrendingSong] = useState(null)

  useEffect(() => {
    getTrendingSong().then((res) => {
      if (res) {
        setTrendingSong(res)
      }
    })
  }, [])

  if (trendingSong) {
    const { artists, key, thumbnail, title, type } = trendingSong

    const getTrendingLink = () => {
      switch (type) {
        case 'SONG':
          return createSongUrl(title, key)
        case 'PLAYLIST':
          return createPlaylistUrl(title, key)
        case 'VIDEO':
          return createVideoUrl(title, key, artists)
        default:
          break
      }
    }

    return (
      <MainContainer defineLang={defineLang}>
        {trendingSong && (
          <div className='suggest-song'>
            <div className='suggest-song-main border-0-1'>
              <div className='suggest-trending-thumb'>
                <Link to={getTrendingLink()}>
                  <img src={thumbnail} alt='thumb' title={title} />
                </Link>
              </div>
              <div className='suggest-trending-info'>
                <p className='suggest-lead-title color-0-5'>{defineLang('Đang được nghe nhiều nhất', 'Top pick these days')}</p>
                <Link className='suggest-title color-0-88' to={getTrendingLink()}>
                  {title}
                </Link>
                <h5 className='suggest-artist color-0-5'>
                  {artists.map((artist, index) => {
                    const { artistId, name, shortLink } = artist

                    return (
                      <React.Fragment key={artistId}>
                        <Link to={createArtistUrl(name, shortLink)}>
                          <span className='suggest-artist-name'>{name}</span>
                        </Link>
                        {index + 1 !== artists.length && ', '}
                      </React.Fragment>
                    )
                  })}
                </h5>
              </div>
            </div>
          </div>
        )}
      </MainContainer>
    )
  }
}

export default NoPlayingSong
