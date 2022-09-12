import React, { useState, useCallback } from 'react'

import { CateCommon, SongFav, ErrorBoundary, PlaylistFav, VideoFav, Container } from 'components'
import { userCateNav } from 'services/User/User'

import { useStore } from 'store'
import { auth } from 'config/firebase'

const FavoriteMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const [curCate, setCurCate] = useState(userCateNav[0].value)

  const handleCateChange = (e, newCate) => {
    setCurCate(newCate)
  }

  const cateCommonProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: userCateNav,
  }

  const cateFavProps = {
    defineLang,
    currentUser: auth.currentUser,
  }

  return (
    <div className='favorite-main relative commonMainOutlet'>
      <ErrorBoundary>
        <Container>
          <div className='fm-container sm:pt-16px ip5:pt-12px sm:px-32px ip5:px-16px'>
            <CateCommon {...cateCommonProps} />
            <div className='fm-content'>
              {curCate === 'song' && <SongFav {...cateFavProps} />}
              {curCate === 'playlist' && <PlaylistFav {...cateFavProps} />}
              {curCate === 'video' && <VideoFav {...cateFavProps} />}
            </div>
          </div>
        </Container>
      </ErrorBoundary>
    </div>
  )
}

export default FavoriteMain
