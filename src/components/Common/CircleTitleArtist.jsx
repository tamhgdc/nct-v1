import React from 'react'
import ArtistCircle from './ArtistCircle'
import CommonArtist from './CommonArtist/CommonArtist'

const CircleTitleArtist = ({ artists, styles = '', circleStyles = '', titleStyles = '' }) => (
  <div className={`w3-row mt-8px h-24px leading-24px flex items-center ${styles}`}>
    <ArtistCircle artists={artists} styles={circleStyles} />
    <div className='w3-rest truncate leading-[inherit] flex items-center h-full'>
      <CommonArtist artists={artists} styles={titleStyles} />
    </div>
  </div>
)

export default React.memo(CircleTitleArtist)
