import { auth } from 'config/firebase'
import { addFavSong, addFavPlaylist, addFavVideo, getUserDetail } from 'services/firebase/firestore'
import { toastNotify } from 'share/toast'

export const handleAddToFavSong = async (songId, defineLang) => {
  if (auth.currentUser) {
    if (songId) {
      const { favorite } = await getUserDetail()
      if (favorite.songs) {
        const isDuplicate = favorite.songs.includes(songId)

        if (isDuplicate) {
          toastNotify(defineLang('Bài hát đã có trong yêu thích.', 'Song already exists in favorite playlist.'))
          return null
        }
      }

      await addFavSong(songId)
      toastNotify(defineLang('Thêm bài hát vào danh sách yêu thích thành công.', 'Successfully added song to favorite list.'), 'success')
    } else {
      toastNotify(defineLang('Có lỗi khi thêm bài hát vào danh sách yêu thích.', 'Add song to favorite list failed due to an error.'), 'error')
    }
  } else {
    toastNotify(defineLang('Vui lòng đăng nhập để thực hiện chức năng này.', 'Login is required to use this feature.'), 'error')
  }
}

export const handleAddToFavPlaylist = async (playlistId, defineLang) => {
  if (auth.currentUser) {
    if (playlistId) {
      const { favorite } = await getUserDetail()
      if (favorite.playlists) {
        const isDuplicate = favorite.playlists.includes(playlistId)

        if (isDuplicate) {
          toastNotify(defineLang('Danh sách phát đã có trong yêu thích.', 'Playlist already exists in favorite playlist.'))
          return null
        }
      }

      await addFavPlaylist(playlistId)
      toastNotify(defineLang('Thêm danh sách phát vào danh sách yêu thích thành công.', 'Successfully added playlist to favorite list.'), 'success')
    } else {
      toastNotify(defineLang('Có lỗi khi thêm danh sách phát vào danh sách yêu thích.', 'Add playlist to favorite list failed due to an error.'), 'error')
    }
  } else {
    toastNotify(defineLang('Vui lòng đăng nhập để thực hiện chức năng này.', 'Login is required to use this feature.'), 'error')
  }
}

export const handleAddToFavVideo = async (videoId, defineLang) => {
  if (auth.currentUser) {
    if (videoId) {
      const { favorite } = await getUserDetail()
      if (favorite.videos) {
        const isDuplicate = favorite.videos.includes(videoId)

        if (isDuplicate) {
          toastNotify(defineLang('Video đã có trong yêu thích.', 'Video already exists in favorite playlist.'))
          return null
        }
      }

      await addFavVideo(videoId)
      toastNotify(defineLang('Thêm video vào danh sách yêu thích thành công.', 'Successfully added video to favorite list.'), 'success')
    } else {
      toastNotify(defineLang('Có lỗi khi thêm video vào danh sách yêu thích.', 'Add video to favorite list failed due to an error.'), 'error')
    }
  } else {
    toastNotify(defineLang('Vui lòng đăng nhập để thực hiện chức năng này.', 'Login is required to use this feature.'), 'error')
  }
}
