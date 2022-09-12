import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './Homepage.scss'

import { useLocation } from 'react-router-dom'
import { useLang } from 'hooks'
import { LeftSidebar, RightSidebar, Title } from 'components'

import { scrollToTop } from 'share'

const Homepage = () => {

  const location = useLocation()

  useEffect(() => {
		scrollToTop()
	}, [location])

  return (
    <div className='hp-container bg-color-1 selection:bg-main selection:text-slate-100'>
      <Title title={useLang('NhacCuaTui Clone - Nghe nhạc Mới, tải nhạc Hot chất lượng cao', 'NhacCuaTui Clone - Music for everyone')} />
      <LeftSidebar />
        <Outlet />
      <RightSidebar />
    </div>
  )
}

export default Homepage
