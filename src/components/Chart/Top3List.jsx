import React, { useCallback } from 'react'
import { useStore } from 'store'

import { Top3Item } from 'components'
import { Link } from 'react-router-dom'

const Top3List = ({ top3 = [], activeItem, setActiveItem }) => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  if (top3.length === 0) return null

  const top3Item = {
    activeItem, setActiveItem, defineLang
  }

  return (
    <div className='px-24px'>
      {top3.map((item, i) => (
        <Top3Item { ... top3Item } key={item.songKey} {...item} i={i} />
      ))}
      <div className='mt-5 flexCenter w-full'>
        <Link to='/bang-xep-hang/realtime' className='text-xs text-white/50 border-white/10 useBorder py-3 px-9 font-semibold rounded-4px hover:text-main hover:border-main transition-colors'>
          {defineLang('Xem thêm', 'View more')}
        </Link>
      </div>
    </div>
  )
}

export default Top3List
