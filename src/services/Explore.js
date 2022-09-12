import { getGenre } from 'api'

export const getExplore = async (type, key, pageIndex = 1, order = 1, pageSize = 36) => {
  try {
    const data = await getGenre(type, key, pageIndex, order, pageSize)

    if (data) return data
  } catch (error) {
    throw new Error(error)
  }
}