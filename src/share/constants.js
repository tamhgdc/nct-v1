import { env } from 'config/environment'

// Link
export const PROXY = env.DOMAIN_URL
export const FB_LINK = 'https://www.facebook.com/trung.quann.2806'
export const INSTA_LINK = 'https://www.instagram.com/tquann286_'
export const GIT_LINK = 'https://github.com/tquann286'

export const TERM_LINK = 'https://www.nhaccuatui.com/thoa-thuan-su-dung'
export const DEFAULT_IMAGE = 'https://stc-id.nixcdn.com/v12/static/media/default_avatar.fb823ac2.png'

// Theme
export const CHANGE_LIGHT_THEME = 'change_light_theme'
export const CHANGE_DARK_THEME = 'change_dark_theme'
export const SET_THEME = 'set_theme'

// Language
export const CHANGE_VI_LANG = 'change_vi_lang'
export const CHANGE_EN_LANG = 'change_en_lang'
export const SET_LANG = 'set_lang'

// Authencation Form
export const TOGGLE_SHOW_LOGIN = 'toggle_show_login'
export const TOGGLE_SHOW_SIGN_UP = 'toggle_show_sign_up'
export const EXISTED_EMAIL = 'auth/email-already-in-use'
export const USER_NOT_FOUND = 'auth/user-not-found'
export const WRONG_PASSWORD = 'auth/wrong-password'

// Firebase
export const FIREBASE_CONFIG = { apiKey: 'AIzaSyAr7zMUtmuoFotHbkd13twUk-fUCbDfSDo', authDomain: 'nhaccuatui-clone.firebaseapp.com', projectId: 'nhaccuatui-clone', storageBucket: 'nhaccuatui-clone.appspot.com', messagingSenderId: '645600209991', appId: '1:645600209991:web:0dbaf70a8b4618591c1562', measurementId: 'G-S647PTTVG4' }

export const SIGNED_IN = 'signed_in'
export const SIGNED_OUT = 'signed_out'

// Regex
export const REGEX_VIETNAMESE = /^(?!.*[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]).*$/
export const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Play
export const SET_PLAYING_SONG = 'set_playing_song'
export const SET_CURRENT_PLAYLIST = 'set_current_playlist'
