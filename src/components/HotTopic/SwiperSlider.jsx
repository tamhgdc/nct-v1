import { Link } from 'react-router-dom'
import { createTopicUrl } from 'share/utilities'
import { Image } from 'components'
import backupImg from 'images/default/default_playlist.png'

const SwiperSlider = ({ keyId, title, thumbURL }) => {
  const imageProps = {
    imageUrl: thumbURL,
    alt: title,
    backupImg,
  }
  return (
    <div className='ht-container'>
      <Link to={createTopicUrl(title, keyId)}>
        <div className='ht-img-container border-0-05'>
          <Image {...imageProps} />
          <div className='ht-blur-layer'></div>
        </div>
      </Link>
    </div>
  )
}

export default SwiperSlider
