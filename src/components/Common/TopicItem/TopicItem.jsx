import React from 'react'
import './TopicItem.scss'
import { createTopicUrl } from 'share/utilities'
import backupImg from 'images/default/default_playlist.png'

import { Link } from 'react-router-dom'
import { Image } from 'components'

const TopicItem = ({ keyId, thumbURL, title }) => {
  return (
    <div className='topic-item-container inherit-width'>
      <Link to={createTopicUrl(title, keyId)}>
        <div className="topic-item-img po-re w100 border-0-05 useBorder pt-100 bdrs4 over-hide">
          <Image imageUrl={thumbURL} backupImg={backupImg} />
          <div className="blur-layer"></div>
        </div>
      </Link>
    </div>
  )
}

export default TopicItem