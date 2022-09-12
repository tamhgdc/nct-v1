import { getVideoDetail, getInfo } from 'api'

export const getVideoDetailData = async (key) => {
  try {
    const data = await getVideoDetail(key)

    return data.video
  } catch (error) {
    console.log(error)
  }
}

export const getVideoStreamUrls = async (key) => {
  try {
    const data = await getInfo(key, 'video')

    return data.video?.streamUrls
  } catch (error) {
    console.log(error)
  }
}
