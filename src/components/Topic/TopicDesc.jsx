import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const TopicDesc = ({ defineLang, description }) => {
  const [readMore, setReadMore] = useState(false)

  const toggleReadMore = () => {
    setReadMore(!readMore)
  }

  return (
    <React.Fragment>
      <div className={`mt-24px mx-32px mb-4 text-sm  color-0-5 ${readMore ? '' : 'line-clamp-2'}`}>{description}</div>
      <div className='color-0-5 clickable pt0-lr3-2 width-fit-content w3-row alcenter' onClick={toggleReadMore}>
        <MdOutlineKeyboardArrowDown className={`transition-transform ${readMore && 'rotate-180'}`} />
        <span className='ml-0-5'>{readMore ?  defineLang('Thu gọn', 'Close') : defineLang('Xem thêm', 'Read more')}</span>
      </div>
    </React.Fragment>
  )
}

export default TopicDesc
