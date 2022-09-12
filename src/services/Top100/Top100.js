import { getTop100Detail } from 'api'

export const getTop100Item = async (top100Id) => {
  try {
    const data = await getTop100Detail(top100Id)

    return data.playlist
  } catch (error) {
    console.log(error)
  }
}
