import { SET_THEME, CHANGE_LIGHT_THEME, CHANGE_DARK_THEME, CHANGE_VI_LANG, CHANGE_EN_LANG, SET_LANG, TOGGLE_SHOW_LOGIN, TOGGLE_SHOW_SIGN_UP, SIGNED_IN, SIGNED_OUT, SET_PLAYING_SONG, SET_CURRENT_PLAYLIST } from 'share/constants'
import { addSongHistory } from 'services/firebase/firestore'

// Theme
export const setTheme = (payload) => ({
  type: SET_THEME,
  payload,
})

export const changeLightTheme = () => {
  localStorage.setItem('theme', 'light')

  return {
    type: CHANGE_LIGHT_THEME,
  }
}

export const changeDarkTheme = () => {
  localStorage.setItem('theme', 'dark')

  return {
    type: CHANGE_DARK_THEME,
  }
}

// Language
export const setLang = (payload) => ({
  type: SET_LANG,
  payload,
})

export const changeViLang = () => {
  localStorage.setItem('lang', 'vi')

  return {
    type: CHANGE_VI_LANG,
  }
}

export const changeEnLang = () => {
  localStorage.setItem('lang', 'en')

  return {
    type: CHANGE_EN_LANG,
  }
}

// Authenciation
export const toggleShowLogin = () => ({
  type: TOGGLE_SHOW_LOGIN,
})

export const toggleShowSignUp = () => ({
  type: TOGGLE_SHOW_SIGN_UP,
})

export const onSignedIn = () => ({
  type: SIGNED_IN,
})

export const onSignedOut = () => ({
  type: SIGNED_OUT,
})

// Play
export const setPlayingSongId = (songId) => {
  localStorage.setItem('playingSongId', songId)
  addSongHistory(songId)

  return {
    type: SET_PLAYING_SONG,
    songId,
  }
}

export const setCurPlaylist = (playlist) => ({
  type: SET_CURRENT_PLAYLIST,
  playlist,
})
