import React, { useState } from 'react'
import './Sharing.scss'

import { Tooltip, IconButton } from '@mui/material'
import { FiShare2 } from 'react-icons/fi'
import { CenterModal } from 'components'
import { FaFacebookF } from 'react-icons/fa'
import { BsLink45Deg } from 'react-icons/bs'
import { FacebookShareButton } from 'react-share'
import { PROXY } from 'share/constants'

const Sharing = ({ defineLang, placement, handleCopyShare, onShareWindowClose, shareLink, shareClass = '' }) => {
  const [showShare, setShowShare] = useState(false)

  const toggleShowShare = () => {
    setShowShare(!showShare)
  }

  const onCopyShare = () => {
    handleCopyShare()
    toggleShowShare()
  }

  const onDoneShareFB = () => {
    onShareWindowClose()
    toggleShowShare()
  }

  const centerModalProps = {
    modalName: defineLang('Chia sẻ', 'Share'),
    showModal: showShare,
    toggleModal: toggleShowShare,
  }
  
  const fbShareProps = {
    url: `${PROXY}${shareLink}`,
    onShareWindowClose: onDoneShareFB,
  }

  return (
    <div className='sharing-container'>
      <Tooltip className={`color-0-5 ${shareClass}`} title={defineLang('Chia sẻ', 'Share')} arrow enterDelay={400} placement={placement}>
        <IconButton aria-label='share' size='large' onClick={toggleShowShare}>
          <FiShare2 />
        </IconButton>
      </Tooltip>
      <CenterModal {...centerModalProps}>
        <div className='sharing-modal-container'>
          <FacebookShareButton {...fbShareProps}>
            <div className='sharing-item sm:pl-16px ip5:pl-6px sm:w-64 ip5:w-40 fb font-semibold'>
              <FaFacebookF className='text-slate-100' />
              <span className='fz-14px sm:ml-16px ip5:ml-4'>Facebook</span>
            </div>
          </FacebookShareButton>
          <div className='sharing-item sm:pl-16px ip5:pl-6px sm:w-64 ip5:w-40 copy-link font-semibold' onClick={onCopyShare}>
            <BsLink45Deg className='text-slate-100' />
            <span className='fz-14px sm:ml-16px ip5:ml-4'>{defineLang('Sao chép link', 'Copy link')}</span>
          </div>
        </div>
      </CenterModal>
    </div>
  )
}

export default Sharing
