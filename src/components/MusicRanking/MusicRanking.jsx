import MusicCard from './MusicCard'
import './MusicRanking.scss'
import { Link } from 'react-router-dom'

import { useStore, actions } from 'store'
import { createTop20Url } from 'share/utilities'
import { useCallback } from 'react'
import { randomId } from 'share'

const MusicRanking = ({ ranking }) => {
  const [state, dispatch] = useStore()
  const { lang, curPlaylist } = state
  const defineLang = useCallback((vie, eng) => (lang === 'vi' ? vie : eng), [lang])

  const musicCardProps = {
    defineLang,
    actions,
    dispatch,
    curPlaylist,
  }

  return (
    <div className='mr-container'>
      <div className='mr-title main-title-scss'>
        <Link to={createTop20Url('nhac-viet')}>{defineLang('BXH bài hát', 'NCT Song Chart')}</Link>
      </div>
      <div className='mr-main sm:flex-row ip5:flex-col'>{ranking.map((rankItem) => rankItem && <MusicCard {...rankItem} key={rankItem.key || randomId(6)} {...musicCardProps} />)}</div>
    </div>
  )
}

export default MusicRanking
