import { removeVietnameseTones, copyToClipboard, convertToPlain, deepCopy } from 'share'
import { toast } from 'react-toastify'
import { PROXY } from 'share/constants'
import { toastNotify } from 'share/toast'
import { getInfo, getListVideosView, getLyric, getRecommend, getView } from 'api'

export const covertTimestamp = (time) => {
  const date = new Date(time)

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export const createSlug = (name = '') => {
  if (name) return `${replaceDashUrl(removeVietnameseTones(name.trim()))}`
}

export const getPlaylistKeyId = (url = '') => {
  const startIndex = url.indexOf('va.') + 3
  const keyIdLength = 12

  if (startIndex) {
    return url.substring(startIndex, keyIdLength)
  } else {
    return null
  }
}

export const replaceDashUrl = (url = '') => {
  return url.replaceAll(' ', '-').replaceAll('/', '-')
}

export const createPlaylistUrl = (title = '', keyId = '') => {
  if (title && keyId) {
    const playlistTitle = replaceDashUrl(title)

    return `/playlist/${playlistTitle}&k=${keyId}`
  } else {
    return '/'
  }
}

export const createSongUrl = (title = '', keyId = '') => {
  if (title && keyId) {
    return `/bai-hat/${createSlug(title)}&k=${keyId}`
  } else {
    return '/'
  }
}

export const createArtistUrl = (name = '', shortLink = '') => {
  if (name && shortLink) {
    return `/nghe-si/${shortLink}`
  } else {
    return `/tim-kiem?q=${name}`
  }
}

export const createTopicUrl = (title = '', keyId = '') => {
  if (title && keyId) {
    return `/chu-de/${createSlug(title)}&k=${keyId}`
  } else {
    return '/'
  }
}

export const createTop100Url = (title = '', keyId = '') => {
  if (title && keyId) {
    return `/top-100/${createSlug(title)}&k=${keyId}`
  } else {
    return '/'
  }
}

export const createVideoUrl = (keyId = '', title = '', artists = []) => {
  const artistLink = artists.reduce((acc, cur, i) => {
    if (!cur.shortLink) {
      return `${acc}${i > 0 ? '-ft-' : ''}${replaceDashUrl(removeVietnameseTones(cur.name))}`
    }
    if (acc) {
      return `${acc}${i > 0 ? '-ft-' : ''}${cur.shortLink}`
    }
    return `${cur.shortLink}`
  }, '')
  const videoLink = `/video/${replaceDashUrl(removeVietnameseTones(title))}-${artistLink}`.toLocaleLowerCase() + `&k=${keyId}`

  return videoLink
}

export const createTop20Url = (category = '') => {
  if (category) {
    return `/bang-xep-hang/top-20?q=${category}`
  } else {
    return '/'
  }
}

export const getListSongsKey = (songs = []) => songs.map((song = {}) => song.key || song.songId || song.keyId)

export const getNavigateUrl = (url = '') => {
  const linkStartIndex = url.indexOf('nhaccuatui.com/') + 15
  const keyStartIndex = url.indexOf('.html') - 12
  const keyEndIndex = url.indexOf('.html')

  const keyId = url.substring(keyStartIndex, keyEndIndex)

  if (url.includes('/bai-hat/')) {
    const songStartIndex = linkStartIndex + 8
    const songEndIndex = keyStartIndex

    const songUrl = url.substring(songStartIndex, songEndIndex)
    return `/bai-hat/${songUrl}&k=${keyId}`
  } else if (url.includes('/playlist/')) {
    const playlistStartIndex = linkStartIndex + 9
    const playlistEndIndex = keyStartIndex

    const playlistUrl = url.substring(playlistStartIndex, playlistEndIndex)
    return `/playlist/${playlistUrl}&k=${keyId}`
  } else {
    return '/'
  }
}

export const copyNotify = (defineLang) =>
  toast(defineLang('🦄 Đã sao chép link.', '🦄 Copied link successfully.'), {
    position: 'bottom-left',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: localStorage.getItem('theme'),
  })

export const handleFocusInput = (e) => {
  e.target.parentElement.classList.add('focus')
}

export const handleBlurInput = (e) => {
  e.target.parentElement.classList.remove('focus')
}

export const handleCopySong = (event, defineLang, title = '', songId = '') => {
  event.stopPropagation()
  if (title && songId && defineLang) {
    const songLink = `${PROXY}${createSongUrl(title, songId)}`

    copyToClipboard(songLink)
    copyNotify(defineLang)
  } else {
    toastNotify(defineLang('Có lỗi khi sao chép liên kết bài hát', 'An  error has occurred when copying song link'), 'error')
  }
}

export const handleCopyPlaylist = (event, title = '', keyId = '', defineLang) => {
  event.stopPropagation()
  if (title && keyId && defineLang) {
    const playlistLink = `${PROXY}${createPlaylistUrl(title, keyId)}`

    copyToClipboard(playlistLink)
    copyNotify(defineLang)
  } else {
    toastNotify(defineLang('Có lỗi khi sao chép liên kết danh sách phát', 'An  error has occurred when copying playlist link'), 'error')
  }
}

export const handleCopyVideo = (event, title, keyId, artists, defineLang) => {
  event.stopPropagation()
  if (title && keyId && defineLang) {
    const videoLink = `${PROXY}${createVideoUrl(keyId, title, artists)}`

    copyToClipboard(videoLink)
    copyNotify(defineLang)
  } else {
    toastNotify(defineLang('Có lỗi khi sao chép liên kết video', 'An  error has occurred when copying video link'), 'error')
  }
}

export const handleCopyTop100 = (event, title, keyId, defineLang) => {
  event.stopPropagation()
  if (title && keyId && defineLang) {
    const top100Link = `${PROXY}${createTop100Url(title, keyId)}`

    copyToClipboard(top100Link)
    copyNotify(defineLang)
  } else {
    toastNotify(defineLang('Có lỗi khi sao chép liên kết danh sách phát', 'An  error has occurred when copying Top 100 link'), 'error')
  }
}

export const calcPaginationPage = (total, itemPerPage = 36) => Math.ceil(total / itemPerPage)

// API
export const getSongsView = async (listSongKeys) => {
  try {
    if (listSongKeys) {
      const data = await getView(listSongKeys)
      
      if (data) return data.song || {}
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const getVideosView = async (listVideoKeys) => {
  try {
    if (listVideoKeys) {
      const data = await getListVideosView(listVideoKeys)
      if (data) return data.video
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const getLyricData = async (key, type) => {
  try {
    const data = await getLyric(key, type)

    return data.lyric
  } catch (error) {
    console.log(error)
  }
}

export const getMaybeLike = async (key, type, size = 12) => {
  try {
    const data = await getRecommend(key, type, size)

    return data.recommend
  } catch (error) {
    console.log(error)
  }
}

export const getPlayingSong = async (songId) => {
  try {
    const songDetail = await getInfo(songId, 'song')

    if (songDetail) return songDetail.song
  } catch (error) {
    console.log(error)
  }
}

export const isFetchingFail = (status, defineLang) => {
  if (status === 'error') {
    toastNotify(defineLang('Có lỗi khi lấy dữ liệu từ server.', 'A server error occurred while retrieving data.'), 'error')
  }
}

export const handleCopyProxy = (defineLang, link) => {
  copyToClipboard(`${PROXY}${link}`)
  copyNotify(defineLang)
}

export const getCurrentDay = () => new Date().toLocaleDateString()

export const manualPagi = (pageIndex, itemsPerPage = 36) => ({ start: (pageIndex - 1) * itemsPerPage, end: pageIndex * itemsPerPage })

// URL
export const getCurrentURL = () => window.location.href

export const getCurrentPathname = () => window.location.pathname

// Lyric
export const handleCopyLyric = (lyric, defineLang) => {
  if (lyric) {
    copyToClipboard(convertToPlain(lyric))
    toastNotify(defineLang('Sao chép lời bài hát thành công.', 'Successfully copied the lyrics.'), 'success')
  }
}

// Create Title with Artists
export const createTitleArtist = (title = '', artists = []) => `${title} - ${artists.map((art) => art.name).join(', ')} - NhacCuaTui Clone`

// Check if an array is valid
export const isValid = (arr = []) => arr.every((item) => typeof item !== 'undefined')
export const getValidArr = (arr = []) => arr.filter(item => typeof item !== 'undefined')

// Get slide video for grid
export const isBigScreen = () => window.innerWidth > 1536

export const getSlideVideos = (videos, size) => {
  if (size === 'big') {
    return deepCopy(videos).slice(0, isBigScreen() ? 3 : 2)
  } else if (size === 'small') {
    return deepCopy(videos).slice(isBigScreen() ? 3 : 2, isBigScreen() ? 9 : 6)
  }
}

// Handle source of video or song
export const handleSourceUrl = (streamUrls = []) =>
  streamUrls
    .filter((stream) => stream.streamUrl)
    .map((stream) => ({
      ...stream,
      url: stream.streamUrl,
    }))

// Get playing song index
export const getPlayingSongIndex = (playingSongId = '', curPlaylist = []) => {
  let playingSongIndex
  curPlaylist.forEach((song, index) => {
    if (song.key === playingSongId) playingSongIndex = index
  })

  return playingSongIndex
}

// Handle play new song
export const handlePlayNewSong = async (songId = '', dispatch, actions, curPlaylist = [], getNewPlaylist, defineLang) => {
  if (songId) {
    const tempSong = await getPlayingSong(songId)

    if (tempSong.streamUrls.length !== 0) {
      dispatch(actions.setPlayingSongId(songId))

      if (getNewPlaylist) {
        const newPlaylist = await getMaybeLike(songId, 'song')
        dispatch(actions.setCurPlaylist(newPlaylist?.data))
      }
    } else {
      toastNotify(defineLang('Bài hát hiện không có sẵn, vui lòng thử lại sau.', 'The song is currently not available, please try again later.'))
      dispatch(actions.setCurPlaylist(curPlaylist.filter((song) => song.key !== songId)))
      if (!getNewPlaylist) {
        const nextSongIndex = getPlayingSongIndex(songId, curPlaylist)

        if (nextSongIndex === curPlaylist.length - 1) {
          handlePlayNewSong(curPlaylist[0].key, dispatch, actions, curPlaylist, false, defineLang)
        } else {
          handlePlayNewSong(curPlaylist[nextSongIndex + 1].key, dispatch, actions, curPlaylist, false, defineLang)
        }
      }
    }
  }
}
