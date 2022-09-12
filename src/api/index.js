import axios from 'axios'
import { sha512 } from 'js-sha512'

const PROXY_URL = 'https://nct.napdev.workers.dev/'
const API_URL = 'https://beta.nhaccuatui.com/api'

const API_KEY = 'e3afd4b6c89147258a56a641af16cc79'
const SECRET_KEY = '6847f1a4fc2f4eb6ab13f9084e082ef4'

const client = axios.create({
  baseURL: typeof window === 'object' ? PROXY_URL + API_URL : API_URL,
  params: {
    a: API_KEY,
  },
})

client.interceptors.request.use((config) => {
  const now = String(Date.now())
  const hash = sha512.hmac(SECRET_KEY, now)
  config.params.t = now
  config.params.s = hash
  return config
})

client.interceptors.response.use((res) => res.data)

const joinQueryString = (obj) =>
  Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&')

// View
export const getView = (listSongKeys) => client.post('counter/view', joinQueryString({ listSongKeys }))
export const getListVideosView = (listVideoKeys) => client.post('counter/view', joinQueryString({ listVideoKeys }))

// Search
export const getMaybeHit = () => client.post('search/maybehit')

export const getSearchByKeywords = (key, pageSize = 12) => client.post('search/all', joinQueryString({ key, pageSize }))

export const getSearchSong = (key, pageIndex = 1, pageSize = 36) => client.post('search/song', joinQueryString({ key, pageIndex, pageSize }))

export const getSearchPlaylist = (key, pageIndex = 1, pageSize = 36) => client.post('search/playlist', joinQueryString({ key, pageIndex, pageSize }))

export const getSearchVideo = (key, pageIndex = 1, pageSize = 36) => client.post('search/video', joinQueryString({ key, pageIndex, pageSize }))

// Explore
export const getGenre = (type, key, pageIndex = 1, order = 1, pageSize = 36) => client.post('genre', joinQueryString({ type, key, order, pageIndex, pageSize }))

// Artist
export const getArtists = (nation, gender) => client.post('artist', joinQueryString({ nation, gender }))
export const getArtistDetail = (shortLink, type = 'all', size = 20, index = 1, sort = 0) => client.post('artist/detail', joinQueryString({ shortLink, type, size, index, sort }))

// Topic
export const getTopics = () => client.post('topic')
export const getTopicDetail = (key) => client.post('topic/detail', joinQueryString({ key }))

// Playlist
export const getCollection = (tags, pageIndex = 1, pageSize = 36) => client.post('tags', joinQueryString({ tags, pageIndex, pageSize }))

export const getPlaylistDetail = (key) => client.post('playing/playlist', joinQueryString({ key }))

// Top 100
export const getTop100Detail = (key) => client.post('top100', joinQueryString({ key }))

// Top 20
export const getTop20 = (category, type = 'song', week, year, size = 20) => client.post('ranking/top20', joinQueryString({ category, type, size, week, year }))

// Song
export const getSongDetail = (key) => client.post('playing/song', joinQueryString({ key }))
export const getLyric = (key, type) => client.post('lyric', joinQueryString({ key, type }))

// Video
export const getVideoDetail = (key) => client.post('playing/video', joinQueryString({ key }))

// Realtime
export const getRealtime = (size) => client.post('ranking/realtime', joinQueryString({ size }))

// Recommmend
export const getRecommend = (key, type, size = 12) => client.post('recommend', joinQueryString({ key, type, size }))

// Information
export const getInfo = (key, type) => client.post('media/info', joinQueryString({ key, type }))
