import { getMaybeHit } from 'api'

export const getTrendingSong = async () => {
  try {
    const data = await getMaybeHit()
    if (data && data.status === 'success') return data.song || data.playlist
  } catch (error) {
    throw new Error(error)
  }
}
