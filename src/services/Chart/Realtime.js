import { getRealtime } from 'api'

export const getRealtimeData = async (size) => {
  try {
    const data = await getRealtime(size)

    return data.ranking || []
  } catch (error) {
    console.log(error)
  }
}