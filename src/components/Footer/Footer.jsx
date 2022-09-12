import React from 'react'
import './Footer.scss'

import { FaPhoneAlt } from 'react-icons/fa'
import { AiOutlineFacebook, AiFillGithub, AiOutlineInstagram } from 'react-icons/ai'

import { FB_LINK, INSTA_LINK, GIT_LINK } from 'share/constants'

const Footer = () => {
  return (
    <div className='ft-container color-0-5 border-0-05'>
      <div className='ft-main'>
        <div className='ft-owner'>
          Cloned by: tquann286_
          <a href='tel:0935802747'>
            <div className='ft-tel'>
              <FaPhoneAlt />
              <p>(0935) 802 747</p>
            </div>
          </a>
        </div>
        <div className='ft-related-link'>
          <a href={FB_LINK} target='_blank' rel='noopener' className='fb-icon'>
            <AiOutlineFacebook />
          </a>
          <a href={INSTA_LINK} target='_blank' rel='noopener' className='insta-icon'>
            <AiOutlineInstagram />
          </a>
          <a href={GIT_LINK} target='_blank' rel='noopener' className='git-icon'>
            <AiFillGithub />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
