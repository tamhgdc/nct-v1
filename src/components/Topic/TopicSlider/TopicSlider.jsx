import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useSlider } from 'hooks'
import { createTopicUrl } from 'share/utilities'
import TopicDesc from './../TopicDesc'

const TopicSlider = ({ defineLang, topicCover }) => {
  const [activeTopic, setActiveTopic] = useState(0)

  useSlider(setActiveTopic, topicCover, 5000)

  if (!topicCover) return null

  const { coverImageURL = '', description = '', key = '', thumbURL = '', title = '' } = topicCover[activeTopic]

  const topicDescProps = {
    defineLang,
    description,
  }

  return (
    <div>
      <Link to={createTopicUrl(title, key)}>
        <div
          className='relative w-full pt-[31.25%] transition-all duration-300'
          style={{
            backgroundImage: `url(${coverImageURL})`,
          }}
        ></div>
      </Link>
      <TopicDesc {...topicDescProps} />
    </div>
  )
}

export default TopicSlider
