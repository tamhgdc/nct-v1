import { useState, useRef } from 'react'
import { OptionModal, Image } from 'components'
import { BsFillPlayCircleFill, BsLink45Deg } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import backupImg from 'images/default/default_playlist.png'

import { useNavigate } from 'react-router-dom'
import { createTop100Url, handleCopyTop100 } from 'share/utilities'

import { useStore } from 'store'

const SwiperSlider = ({ keyId, title, thumbnail }) => {
  const [state] = useStore()
  const defineLang = (vie, eng) => (state.lang === 'vi' ? vie : eng)

  const navigate = useNavigate()

  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const top100ContainerRef = useRef(null)
  const moreDivRef = useRef(null)

  const toggleShowMore = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

  const onNavigateTop100 = (title, keyId) => {
    navigate(createTop100Url(title, keyId))
  }

  const handleCopyClick = (e) => {
    handleCopyTop100(e, title, keyId, defineLang)
    toggleShowMore()
  }

  const imageProps = {
    imageUrl: thumbnail,
    alt: title,
    backupImg,
  }

  return (
    <div className='pl-container'>
      <div className='pl-img-container' onClick={() => onNavigateTop100(title, keyId)}>
        <Image {...imageProps} />
        <div className='pl-extensions' ref={top100ContainerRef}>
          <div className='pl-play-btn'>
            <BsFillPlayCircleFill />
          </div>
          <div title={defineLang('Thêm', 'More')} className='pl-more' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
            <IoMdMore />
          </div>
        </div>
      </div>
      <OptionModal showModal={showMoreOptions} positionRef={top100ContainerRef} parentRef={moreDivRef} toggleModal={toggleShowMore}>
        <div className='om-main color-0-88 bg-color-1'>
          <ul>
            <li onClick={(e) => handleCopyClick(e)}>
              <BsLink45Deg />
              <span>{defineLang('Sao chép link', 'Copy link')}</span>
            </li>
          </ul>
        </div>
      </OptionModal>
    </div>
  )
}

export default SwiperSlider
