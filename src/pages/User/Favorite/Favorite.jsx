import React from 'react'
import './Favorite.scss'

import { FavoriteMain, NoUserFound, Title } from 'components'
import { auth } from 'config/firebase'
import { useStore } from 'store'

const Favorite = () => {
  const [state] = useStore()
  const defineLang = (vie, eng) => state.lang === 'vi' ? vie : eng

  if (!auth.currentUser) return <NoUserFound />

  return (
    <div className='user-favorite-container'>
      <Title title={defineLang(`${auth.currentUser.displayName} | Danh sách yêu thích`, `${auth.currentUser.displayName} | Favorite lists`)} />
      <FavoriteMain />
    </div>
  )
}

export default Favorite