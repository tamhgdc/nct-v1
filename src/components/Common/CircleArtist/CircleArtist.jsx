import { Link } from 'react-router-dom'
import { Image } from 'components'
import { createArtistUrl } from 'share/utilities'
import noArtistImg from 'images/default/default_artist.png'
import './CircleArtist.scss'

const CircleArtist = ({ name, shortLink, imageUrl }) => {

  return (
    <Link to={createArtistUrl(name, shortLink)}>
      <div className='circle-artist-container'>
        <Image className='border-0-1' imageUrl={imageUrl} backupImg={noArtistImg} title={name} />
        <p className='color-0-88'>{name}</p>
      </div>
    </Link>
  )
}

export default CircleArtist
