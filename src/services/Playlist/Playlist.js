import { getPlaylistDetail } from 'api'

export const getPlaylistDetailData = async (key) => {
  try {
    const data = await getPlaylistDetail(key)

    return data.playlist
  } catch (error) {
    console.log(error)
  }
}
