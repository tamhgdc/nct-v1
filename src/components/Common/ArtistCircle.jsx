import React from 'react'

import { createArtistUrl } from 'share/utilities'
import { Link } from 'react-router-dom'
import no_artist_img from 'images/default/default_artist.png'
import { Image } from 'components'

const ArtistCircle = ({ artists, styles }) => {
  if (!artists) return null

  return (
    <div className={`flex ${styles}`}>
      {artists.map((artist, i) => {
        const { artistId, name, shortLink, imageUrl } = artist
        const imageProps = {
          imageUrl,
          backupImg: no_artist_img,
        }

        return (
          <Link key={artistId} to={createArtistUrl(name, shortLink)} className={`relative sm:w-24px ip5:w-22px sm:h-24px ip5:h-22px useBorder border-slate-50 rounded-circle ${i !== 0 ? '-ml-8px' : ''}`} style={{ zIndex: artists.length - i }}>
            <Image {...imageProps} className='rounded-circle' />
          </Link>
        )
      })}
    </div>
  )
}

export default ArtistCircle
