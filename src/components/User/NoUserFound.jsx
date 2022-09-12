import React from 'react'

import { useLang } from 'hooks'
import { Title } from 'components'
import { NotFound } from 'pages'

const NoUserFound = () => {
  return (
    <div className='no-user-found'>
      <Title title={useLang('Không tìm thấy người dùng', 'No user found')} />
      <NotFound vie='Vui lòng đăng nhập để sử dụng tính năng này' eng='Please login to use this feature' />
    </div>
  )
}

export default NoUserFound
