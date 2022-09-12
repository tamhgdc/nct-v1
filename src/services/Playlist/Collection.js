import { getCollection } from 'api'

export const getCollectionRes = async (tags, pageIndex) => {
  try {
    const data = await getCollection(tags, pageIndex)

    return data?.playlistTags
  } catch (error) {
    console.log(error)
  }
}