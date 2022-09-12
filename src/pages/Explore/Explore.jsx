import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import './Explore.scss'

import { ShadowThumb, Footer, Title } from 'components'
import m4u_image from 'images/m4u/m4u_v1.jpg'

import { auth } from 'config/firebase'
import { useStore, actions } from 'store'

const Explore = () => {
  const [state, dispatch] = useStore()
  const { lang } = state

  const defineLang = useCallback((vie, eng) => lang === 'vi' ? vie : eng, [lang])

  return (
    <div className='explore-container commonMainOutlet'>
      <Title title={defineLang('Giai điệu âm nhạc dành riêng cho bạn - NhacCuaTui', 'Music melody just for you - NhacCuaTui')} />
      <div className='explore-wrapper'>
        <div className='explore-content'>
          <div className='pt-24px sm:px-32px ip5:px-16px xs:px-22px'>
            <div className='explore-main'>
              <ShadowThumb styles='sm:w-240px ip5:w-150px ip6:200px' shadowHeight='0.6rem' imageUrl={m4u_image} />
              <div className='explore-description'>
                <p className='title-playlist fz-16px color-0-88 font-bold'>
                  <span className='color-0-5 fz-14px font-normal'>{defineLang('Danh sách phát: ', 'Playlist: ')}</span>
                  Music 4U
                </p>
                <p className='description color-0-5 fz-14px font-normal sm:mt-8 ip5:mt-6'>{auth.currentUser ? defineLang('Dữ liệu nghe nhạc của bạn chưa đủ để sử dụng tính năng này, tiếp tục nghe nhạc để chúng tôi có thể hiểu bạn nhiều hơn.', 'Your data is not enough to use this feature. Listen more the get the music that matches your interest!') : defineLang('Đăng nhập ngay để khám phá những ca khúc hay nhất được chọn lọc dành riêng cho bạn.', "Sign in now to discover the best songs selected just for you. Don't miss it out!")}</p>
                <div className='explore-btn border-0-1 width-160px'>
                  <p className='explore-btn-title transition-colors fz-14px font-medium color-0-5'>{auth.currentUser ? <Link to='/bang-xep-hang/top-20?q=nhac-viet'>{defineLang('Nghe nhạc', 'Listen music')}</Link> : <span onClick={() => dispatch(actions.toggleShowLogin())}>{defineLang('Đăng nhập ngay', 'Sign in now')}</span>}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Explore
