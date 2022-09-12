import React from 'react'

import { onClickSupport } from 'services/SettingsModal'

import { MdLanguage, MdWbSunny } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { MdArrowForwardIos } from 'react-icons/md'
import { AiOutlineLogout } from 'react-icons/ai'

import { actions } from 'store'

import { signOut } from 'firebase/auth'
import { auth } from 'config/firebase'
import { toastNotify } from 'share/toast'

const SettingsModal = ({ user, theme, lang, dispatch }) => {

  const onChangeViLang = () => {
    if (lang === 'en') dispatch(actions.changeViLang())
  }

  const onChangeEnLang = () => {
    if (lang === 'vi') dispatch(actions.changeEnLang())
  }

  const onChangeLightTheme = () => {
    if (theme === 'dark') dispatch(actions.changeLightTheme())
  }

  const onChangeDarkTheme = () => {
    if (theme === 'light') dispatch(actions.changeDarkTheme())
  }

  const onLogout = () => {
    signOut(auth)
    toastNotify(lang === 'vi' ? 'Đăng xuất thành công.' : 'Logout successfully.', 'success')
  }

  return (
    <div className='sm-container color-0-6 bg-color-1'>
      <div className='sm-item hover-bg-color-0-05 sm-languages'>
        <MdLanguage className='sm-icon' />
        <span className='sm-title'>{lang === 'vi' ? 'Ngôn ngữ' : 'Language'}</span>
        <MdArrowForwardIos className='ar-icon' />
        <div className='sm-sub-items bg-color-1 sm-lang-items'>
          <div className='sm-sub-item hover-bg-color-0-05 sm-lang-vi' onClick={onChangeViLang}>
            <span className='sm-title'>{lang === 'vi' ? 'Tiếng Việt' : 'Vietnamese'}</span>
          </div>
          <div className='sm-sub-item hover-bg-color-0-05 sm-lang-en' onClick={onChangeEnLang}>
            <span className='sm-title'>{lang === 'vi' ? 'Tiếng Anh' : 'English'}</span>
          </div>
        </div>
      </div>
      <div className='sm-item hover-bg-color-0-05 sm-support' onClick={onClickSupport}>
        <BiSupport className='sm-icon' />
        <span className='sm-title'>{lang === 'vi' ? 'Hỗ trợ' : 'Support'}</span>
      </div>
      <div className='sm-item hover-bg-color-0-05 sm-themes'>
        {theme === 'light' ? <MdWbSunny className='sm-icon' /> : <BsFillMoonStarsFill className='sm-icon' />}
        <span className='sm-title'>{lang === 'vi' ? 'Chủ đề' : 'Theme'}</span>
        <MdArrowForwardIos className='ar-icon' />
        <div className='sm-sub-items bg-color-1 sm-theme-items'>
          <div className='sm-sub-item hover-bg-color-0-05 sm-theme-light' onClick={onChangeLightTheme}>
            <span className='sm-title'>{lang === 'vi' ? 'Nền sáng' : 'Light mode'}</span>
          </div>
          <div className='sm-sub-item hover-bg-color-0-05 sm-theme-dark' onClick={onChangeDarkTheme}>
            <span className='sm-title'>{lang === 'vi' ? 'Nền tối' : 'Dark mode'}</span>
          </div>
        </div>
      </div>
      {user && (
        <div className='sm-item hover-bg-color-0-05 sm-logout' onClick={onLogout}>
          <AiOutlineLogout className='sm-icon' />
          <span className='sm-title'>{lang === 'vi' ? 'Đăng xuất' : 'Logout'}</span>
        </div>
      )}
    </div>
  )
}

export default SettingsModal
