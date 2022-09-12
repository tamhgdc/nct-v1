import { auth, db } from 'config/firebase'
import { setDoc, updateDoc, arrayUnion, arrayRemove, doc, deleteField, getDoc } from 'firebase/firestore'

import { DEFAULT_IMAGE } from 'share/constants'
import { toastNotify } from 'share/toast'
import { updateProfile } from 'firebase/auth'

export const addUser = (docRef, username, email, photoUrl, userId) =>
  setDoc(docRef, {
    username,
    email,
    photoUrl: photoUrl || DEFAULT_IMAGE,
    history: {},
    favorite: {},
    userId,
  })

export const addFavSong = (songId) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)

  updateDoc(currentUserRef, {
    'favorite.songs': arrayUnion(songId),
  })
}

export const removeFavItem = (key, cate, defineLang) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)

  switch (cate) {
    case 'song':
      updateDoc(currentUserRef, {
        'favorite.songs': arrayRemove(key),
      })
      toastNotify(defineLang('Xóa bài hát khỏi yêu thích thành công', 'Removed song from favorite list successfully'), 'success')
      break
    case 'playlist':
      updateDoc(currentUserRef, {
        'favorite.playlists': arrayRemove(key),
      })
      toastNotify(defineLang('Xóa danh sách phát khỏi yêu thích thành công', 'Removed playlist from favorite successfully'), 'success')
      break
    case 'video':
      updateDoc(currentUserRef, {
        'favorite.videos': arrayRemove(key),
      })
      toastNotify(defineLang('Xóa video khỏi yêu thích thành công', 'Removed video from favorite successfully'), 'success')
      break
    default:
      break
  }
}

export const removeHistoryItem = (key, cate, defineLang) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)

  switch (cate) {
    case 'song':
      updateDoc(currentUserRef, {
        'history.songs': arrayRemove(key),
      })
      toastNotify(defineLang('Xóa bài hát khỏi lịch sử thành công', 'Removed song from history list successfully'), 'success')
      break
    case 'playlist':
      updateDoc(currentUserRef, {
        'history.playlists': arrayRemove(key),
      })
      toastNotify(defineLang('Xóa danh sách phát khỏi lịch sử thành công', 'Removed playlist from history successfully'), 'success')
      break
    case 'video':
      updateDoc(currentUserRef, {
        'history.videos': arrayRemove(key),
      })
      toastNotify(defineLang('Xóa video khỏi lịch sử thành công', 'Removed video from history successfully'), 'success')
      break
    default:
      break
  }
}

export const handleClearAllFav = (cate, defineLang) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)

  switch (cate) {
    case 'songs':
      updateDoc(currentUserRef, {
        'favorite.songs': deleteField(),
      })
      toastNotify(defineLang('Xóa tất cả bài hát khỏi yêu thích thành công', 'Removed all songs from favorite list successfully'), 'success')
      break
    case 'playlists':
      updateDoc(currentUserRef, {
        'favorite.playlists': deleteField(),
      })
      toastNotify(defineLang('Xóa tất cả danh sách phát khỏi yêu thích thành công', 'Removed all playlists from favorite list successfully'), 'success')
      break
    case 'videos':
      updateDoc(currentUserRef, {
        'favorite.videos': deleteField(),
      })
      toastNotify(defineLang('Xóa tất cả video khỏi yêu thích thành công', 'Removed all videos from favorite list successfully'), 'success')
      break
    default:
      break
  }
}

export const handleClearAllHistory = (cate, defineLang) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)

  switch (cate) {
    case 'songs':
      updateDoc(currentUserRef, {
        'history.songs': deleteField(),
      })
      toastNotify(defineLang('Xóa tất cả bài hát khỏi lịch sử thành công', 'Removed all songs from history successfully'), 'success')
      break
    case 'playlists':
      updateDoc(currentUserRef, {
        'history.playlists': deleteField(),
      })
      toastNotify(defineLang('Xóa tất cả danh sách phát khỏi lịch sử thành công', 'Removed all playlists from history successfully'), 'success')
      break
    case 'videos':
      updateDoc(currentUserRef, {
        'history.videos': deleteField(),
      })
      toastNotify(defineLang('Xóa tất cả video khỏi lịch sử thành công', 'Removed all videos from history successfully'), 'success')
      break
    default:
      break
  }
}

export const addFavPlaylist = (playlist) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)

  updateDoc(currentUserRef, {
    'favorite.playlists': arrayUnion(playlist),
  })
}

export const addFavVideo = (video) => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)

  updateDoc(currentUserRef, {
    'favorite.videos': arrayUnion(video),
  })
}

export const getUserDetail = async () => {
  const currentUserRef = doc(db, 'users', auth.currentUser.uid)
  const userSnap = await getDoc(currentUserRef)

  if (userSnap.exists()) {
    return userSnap.data()
  }
}

export const addSongHistory = async (songId) => {
  if (auth.currentUser) {
    const currentUserRef = doc(db, 'users', auth.currentUser.uid)

    updateDoc(currentUserRef, {
      'history.songs': arrayUnion(songId),
    })
  }
}

export const addPlaylistHistory = async (playlistId) => {
  if (auth.currentUser) {
    const currentUserRef = doc(db, 'users', auth.currentUser.uid)

    updateDoc(currentUserRef, {
      'history.playlists': arrayUnion(playlistId),
    })
  }
}

export const addVideoHistory = async (videoId) => {
  if (auth.currentUser) {
    const currentUserRef = doc(db, 'users', auth.currentUser.uid)

    updateDoc(currentUserRef, {
      'history.videos': arrayUnion(videoId),
    })
  }
}

export const updateUserInfo = async (field, data, setData, isUpdateProfile = false) => {
  try {
    if (auth.currentUser) {
      const currentUserRef = doc(db, 'users', auth.currentUser.uid)
  
      if (isUpdateProfile) {
        updateProfile(auth.currentUser, {
          [field]: data
        })
      } else {
        updateDoc(currentUserRef, {
          [field]: data,
        })
      }

      setData(oldData => ({ ...oldData, [field]: data }))
    }
  } catch (error) {
    console.log(error)
  }
}
