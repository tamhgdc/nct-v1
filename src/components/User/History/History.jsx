import React, { useState, useCallback } from 'react'

import { CateCommon, Container, SongHistory, PlaylistHistory, VideoHistory, Title, ErrorBoundary } from 'components'
import { useStore } from 'store'
import { auth } from 'config/firebase'
import { userCateNav } from 'services/User/User'

const History = () => {
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

  const cateHistoryProps = {
    defineLang,
    currentUser: auth.currentUser,
  }

  return (
    <div className='commonMainOutlet'>
      <ErrorBoundary>
        <Container>
          <Title title={`${auth.currentUser.displayName} | ${defineLang('Lịch sử nghe nhạc', 'Song History')} | NhacCuaTui Clone`} />
          <CateCommon {...cateCommonProps} />
          <div className='pt-44px px-32px'>
            {curCate === 'song' && <SongHistory {...cateHistoryProps} />}
            {curCate === 'playlist' && <PlaylistHistory {...cateHistoryProps} />}
            {curCate === 'video' && <VideoHistory {...cateHistoryProps} />}
          </div>
        </Container>
      </ErrorBoundary>
    </div>
  )
}

export default History
