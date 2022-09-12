import { getSongDetail } from 'api'

export const getSongDetailData = async (key) => {
  try {
    const data = await getSongDetail(key)

    return data.song
  } catch (error) {
    console.log(error)
  }
}