import React, { useState, useEffect, useCallback } from 'react'

import { fetchHomeData } from 'services/HomeContent'

import { NotFound } from 'pages'
import { Loading, ShowcaseSlider, TopicEvent, NewRelease, HomeTop3, MusicRanking, NewVideo, Song, HotTopic, Top100, Footer } from 'components'
import { toastNotify } from 'share/toast'

import { useStore } from 'store'
import { useWindowSize } from 'hooks'

const MainHomepage = () => {
  const [homeContent, setHomeContent] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isFetchingFail, setIsFetchingFail] = useState(false)

  const size = useWindowSize()
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  useEffect(() => {
    fetchHomeData()
      .then((res) => {
        setHomeContent(res)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        
        setIsLoading(false)
        setIsFetchingFail(true)
        toastNotify(defineLang('Có lỗi khi lấy dữ liệu từ server.', 'A server error occurred while retrieving data.'), 'error')
      })
  }, [defineLang])

  if (isFetchingFail) return <NotFound />
  
  if (isLoading) {
    return (
      <div className='commonMainOutlet'>
        <Loading />
      </div>
    )
  }

  const { showcase = [], topicEvent, newRelease, top3, ranking, usukRanking, kpopRanking, video, song, topic, top100 } = homeContent

  const top3Props = {
    top3,
    defineLang,
    showTop3: size.width > 600,
  }

  return (
    <div className='hp-main commonMainOutlet relative'>
      <ShowcaseSlider showcase={showcase} />
      <TopicEvent topicEvent={topicEvent} />
      <NewRelease newRelease={newRelease} />
      <HomeTop3 { ... top3Props } />
      <MusicRanking ranking={[ranking, usukRanking, kpopRanking]} />
      <NewVideo videos={video} />
      <Song song={song} />
      <HotTopic hotTopic={topic} />
      <Top100 top100List={top100} />
      <Footer />
    </div>
  )
}

export default MainHomepage
