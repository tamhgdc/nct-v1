import React from 'react'
import { Link } from 'react-router-dom'
import Top3Realtime from './../Common/Top3Realtime'

const HomeTop3 = ({ top3 = [], defineLang, showTop3 }) => {
  if (top3.length === 0) return null

  const top3Props = { top3, defineLang, showTop3, styles: 'mt-16px mx-32px' }

  return (
    <div>
      <Link to='/bang-xep-hang/realtime' className='color-0-88 text-xl font-bold clickable ml-32px'>
        NCT Realtime
      </Link>
      <Top3Realtime {...top3Props} />
    </div>
  )
}

export default HomeTop3
