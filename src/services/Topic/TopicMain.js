import { getTopics, getTopicDetail } from 'api'

export const getTopicsMain = async () => {
  try {
    const data = await getTopics()

    if (data) return { topic: data.topic, topicCover: data.topicCover }
  } catch (error) {
    throw new Error(error)
  }
}

export const getTopicDetailData = async (key) => {
  try {
    const data = await getTopicDetail(key)

    return data.topic
  } catch (error) {
    console.log(error)
  }
}
