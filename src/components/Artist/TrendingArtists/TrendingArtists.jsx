import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './TrendingArtists.scss'

import { Sharing } from 'components'
import { createArtistUrl, getCurrentDay, getCurrentPathname, handleCopyProxy } from 'share/utilities'
import { toastNotify } from 'share/toast'
import { getTopArtists } from 'services/Search/SearchContent'
import { Grid } from '@mui/material'

const TrendingArtists = ({ defineLang }) => {
  const [trendArtists, setTrendArtists] = useState(null)

  useEffect(() => {
    const getTrendArtistsState = async () => {
      try {
        const trendArtists = await getTopArtists()

        setTrendArtists(trendArtists)
      } catch (error) {
        throw new Error(error)
      }
    }

    getTrendArtistsState()
  }, [])

  const handleCopyShare = () => {
    handleCopyProxy(defineLang, getCurrentPathname())
  }

  const onShareWindowClose = () => {
    toastNotify(defineLang('Chia sẻ lên facebook thành công', 'Share to facebook successfully'), 'success')
  }

  const sharingProps = {
    defineLang,
    placement: 'bottom',
    handleCopyShare,
    onShareWindowClose,
    shareLink: '/nghe-si',
  }

  if (!trendArtists) return null

  const [top1] = trendArtists

  return (
    <div className='artists-trending-container bg-color-0-02'>
      <div className='artists-trending-title alcenter-jcbetween'>
        <div className='common-header alcenter color-0-5'>
          <div className='common-title color-0-88'>{defineLang('Nghệ Sỹ Trending', 'Trending Artists')}</div>
          <span className='ml-1-6'>{defineLang(`Cập nhật ngày: `, `Updated date: `)}{getCurrentDay()}</span>
        </div>
        <Sharing {...sharingProps} />
      </div>
      <div className='artists-trending-main'>
        <div className='artists-trending-top1'>
          <Link to={createArtistUrl(top1.name, top1.shortLink)}>
            <div className='top1-img' style={{ backgroundImage: `url(${top1.imageUrl})` }} title={top1.name}></div>
          </Link>
        </div>
        <div className='list-artist'>
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {trendArtists.map((artist) => {
              const { name, position, shortLink } = artist

              return (
                <Grid key={name} item xs={12} sm={6} md={6} lg={4} xl={3}>
                  <Link to={createArtistUrl(name, shortLink)}>
                    <div className='artist-item hover-bg-color-0-05'>
                      <p className='artist-item-position color-0-5'>{position}</p>
                      <div className='w2-2rem mr1'>
                        <div className='new-label'>New</div>
                      </div>
                      <div className='artist-item-name color-0-88'>{name}</div>
                    </div>
                  </Link>
                </Grid>
              )
            })}
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default TrendingArtists
