import React from 'react'
import { Link } from 'react-router-dom'
import './CommonArtist.scss'

import { createArtistUrl } from 'share/utilities'

const CommonArtist = ({ artists, styles = '' }) => {
  if (!artists) return null

  return (
    <div className={`common-artists-container color-0-5 ${styles}`}>
      {artists.map((artist, index) => {
        const { artistId, name, shortLink } = artist

        return (
          <React.Fragment key={artistId}>
            <Link to={createArtistUrl(name, shortLink)} className='common-artists-name fz-13px' onClick={(e) => e.stopPropagation()}>
              <span>{name}</span>
            </Link>
            {index + 1 === artists.length ? '' : ', '}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default CommonArtist
