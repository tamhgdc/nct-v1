import React, { useState, useEffect, useCallback } from 'react'

import { Footer, LoadingV2, Title, TopicItem, TopicSlider } from 'components'
import { getTopicsMain } from 'services/Topic/TopicMain'
import { useStore } from 'store'
import { Grid } from '@mui/material'
import { NotFound } from 'pages'

const TopicMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const [topicContent, setTopicContent] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getTopicsState = async () => {
      try {
        setIsLoading(true)
        const topicContent = await getTopicsMain()

        setTopicContent(topicContent)
        setIsLoading(false)
      } catch (error) {
        throw new Error(error)
      }
    }

    getTopicsState()
  }, [])

  if (isLoading)
    return (
      <div className='commonMainOutlet flexCenter h100vh'>
        <LoadingV2 />
      </div>
    )

  const topicSliderProps = {
    defineLang,
    topicCover: topicContent?.topicCover,
  }

  if (!topicContent.topic) return <NotFound />

  return (
    <div className='commonMainOutlet'>
      <Title title={defineLang('Nghe nhạc cực HOT theo chủ đề - NhacCuaTui Clone', 'Listen to HOT music by topic - NhacCuaTui')} />
      <div className="topic-main-container margin-footer">
        <TopicSlider { ... topicSliderProps } />
        <div className="topic-main-title common-title color-0-88 common-marginTLR">{defineLang('Chủ đề', 'Topics')}</div>
        <div className="topic-main-content common-marginTLR">
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {topicContent?.topic?.map(topic => (
              <Grid key={topic.key} item xs={6} sm={4} md={4} lg={3} xl={2}>
                <TopicItem { ... topic } keyId={topic.key} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TopicMain
