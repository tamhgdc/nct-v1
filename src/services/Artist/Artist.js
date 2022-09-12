import { getArtists, getArtistDetail } from 'api'

export const getArtistsMain = async (nation, gender) => {
  try {
    const data = await getArtists(nation, gender)

    if (data) return data.artist
  } catch (error) {
    console.log(error)
  }
}

export const getArtistDetailData = async (shortLink, type, size, index, sort = 0) => {
  try {
    const data = await getArtistDetail(shortLink, type, size, index, sort)

    if (data) return data
  } catch (error) {
    console.log(error)
  }
}