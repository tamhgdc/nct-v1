import React, { useState, useCallback } from 'react'
import './AuthForm.scss'
import { LoadingV2 } from 'components'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { DEFAULT_IMAGE, TERM_LINK } from 'share/constants'
import { toastNotify } from 'share/toast'
import { handleFocusInput, handleBlurInput } from 'share/utilities'

import { authSchema, handleLoginError, handleSignUpError } from 'services/AuthForm'

import { useStore, actions } from 'store'

import { IoMdClose } from 'react-icons/io'
import { AiOutlineUser } from 'react-icons/ai'
import { BsKeyboard, BsInfoCircle } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'
import { IoWarningOutline } from 'react-icons/io5'
import { FaFacebookF } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import loginLogo from 'images/login-logo.png'

import { auth, db, facebookProvider, googleProvider } from 'config/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { addUser } from 'services/firebase/firestore'
import { doc, getDoc } from 'firebase/firestore'

const AuthForm = () => {
  const [state, dispatch] = useStore()
  const { lang, showLogin, showSignUp } = state

  const [agreeTerm, setAgreeTerm] = useState(false || showLogin)
  const [isVerifying, setIsVerifying] = useState(false)

  const defineLang = useCallback((vie, eng) => lang === 'vi' ? vie : eng, [lang])

  const handleAuthFunc = (loginFunc, signUpFunc) => {
    return (showLogin && loginFunc) || (showSignUp && signUpFunc)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', reValidateMode: 'onChange', resolver: yupResolver(authSchema(defineLang, handleAuthFunc)) })

  const toggleShowLogin = () => {
    dispatch(actions.toggleShowLogin())
  }

  const toggleShowSignUp = () => {
    dispatch(actions.toggleShowSignUp())
  }

  const changeAuthForm = () => {
    toggleShowLogin()
    toggleShowSignUp()
  }

  const onLoginSubmit = async ({ email, password }) => {
    try {
      setIsVerifying(true)

      await signInWithEmailAndPassword(auth, email, password)

      toastNotify(defineLang('Đăng nhập thành công.', 'Sign in successfully.'), 'success')
      toggleShowLogin()
      setIsVerifying(false)
    } catch (error) {
      handleLoginError(error.code, defineLang)
      setIsVerifying(false)
    }
  }

  const onSignUpSubmit = async ({ username, email, password }) => {
    try {
      setIsVerifying(true)

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: DEFAULT_IMAGE,
      })

      const docRef = doc(db, 'users', userCredential.user.uid)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        // User is not exists in firestore
        await addUser(docRef, username, email, null, userCredential.user.uid)
      }

      toastNotify(defineLang('Đăng ký thành công.', 'Sign up successfully.'), 'success')

      toggleShowSignUp()
      setIsVerifying(false)
    } catch (error) {
      handleSignUpError(error.code, defineLang)
      setIsVerifying(false)
    }
  }

  const onSignInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider)
      const docRef = doc(db, 'users', userCredential.user.uid)
      const docSnap = await getDoc(docRef)

      const { displayName, email, photoURL, uid } = userCredential.user

      if (!docSnap.exists()) {
        // User is not exists in firestore
        await addUser(docRef, displayName, email, photoURL, uid)
      }
      toastNotify(defineLang('Đăng nhập thành công.', 'Sign in successful.'), 'success')
      if (showLogin) {
        toggleShowLogin()
      } else if (showSignUp) {
        toggleShowSignUp()
      }
    } catch (error) {
      toastNotify(defineLang('Đăng nhập không thành công.', 'Sign in unsuccessful.'), 'error')
    }
  }

  const onSignInWithFacebook = async () => {
    try {
      const userCredential = await signInWithPopup(auth, facebookProvider)
      const docRef = doc(db, 'users', userCredential.user.uid)
      const docSnap = await getDoc(docRef)

      const { displayName, email, photoURL, uid } = userCredential.user

      if (!docSnap.exists()) {
        // User is not exists in firestore
        await addUser(docRef, displayName, email, photoURL, uid)
      }
      toastNotify(defineLang('Đăng nhập thành công.', 'Sign in successful.'), 'success')

      if (showLogin) {
        toggleShowLogin()
      } else if (showSignUp) {
        toggleShowSignUp()
      }
    } catch (error) {
      toastNotify(defineLang('Đăng nhập không thành công.', 'Sign in unsuccessful.'), 'error')
    }
  }
  
  return (
    <div className='af-container sm:w-460px ip5:w-380px' onClick={(e) => e.stopPropagation()}>
      <div className='af-main bg-color-1'>
        <div className='af-header border-0-05 color-0-88'>
          <h4>{lang === 'vi' ? handleAuthFunc('Đăng nhập', 'Đăng ký') : handleAuthFunc('Sign in', 'Sign up')}</h4>
          <button className='close-btn' onClick={handleAuthFunc(toggleShowLogin, toggleShowSignUp)}>
            <IoMdClose />
          </button>
        </div>
        <div className={`af-content ${showLogin && 'mt-36px'}`}>
          <div className='form-container'>
            <form onSubmit={handleSubmit(handleAuthFunc(onLoginSubmit, onSignUpSubmit))}>
              {showSignUp && (
                <React.Fragment>
                  <div className='input-container username'>
                    <div className='input-main border-0-05'>
                      <AiOutlineUser className='input-icon border-0-05 color-0-5' />
                      <input className='color-0-5 bg-color-0-01' type='text' {...register('username')} placeholder={defineLang('Tên hiển thị', 'Username')} onFocus={(e) => handleFocusInput(e)} onBlur={(e) => handleBlurInput(e)} />
                      {showSignUp && (
                        <div className='more-info username'>
                          <BsInfoCircle className='more-info-icon color-0-2' />
                          <div className='more-info-description'>
                            <p>{defineLang('Bạn có thể sử dụng chữ cái, chữ số, gạch dưới và dấu chấm. Chiều dài tối đa 30 kí tự', 'You can use letters, numbers, underscores and dots. Length from 30 characters')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.username && (
                    <p className='error'>
                      <IoWarningOutline /> {errors.username.message}
                    </p>
                  )}
                </React.Fragment>
              )}
              <div className='input-container email'>
                <div className='input-main border-0-05'>
                  <HiOutlineMail className='input-icon border-0-05 color-0-5' />
                  <input className='color-0-5 bg-color-0-01' type='email' {...register('email')} placeholder='Email' onFocus={(e) => handleFocusInput(e)} onBlur={(e) => handleBlurInput(e)} />
                  {showSignUp && (
                    <div className='more-info email'>
                      <BsInfoCircle className='more-info-icon color-0-2' />
                      <div className='more-info-description'>
                        <p>{defineLang('Điền vào Email bạn muốn sử dụng cho tài khoản này', 'Fill in the Email you want to use for this account')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {errors.email && (
                <p className='error'>
                  <IoWarningOutline /> {errors.email.message}
                </p>
              )}
              <div className='input-container password'>
                <div className='input-main border-0-05'>
                  <BsKeyboard className='input-icon border-0-05 color-0-5' />
                  <input className='color-0-5 bg-color-0-01' type='password' {...register('password')} placeholder={defineLang('Mật khẩu', 'Password')} onFocus={(e) => handleFocusInput(e)} onBlur={(e) => handleBlurInput(e)} />
                  {showSignUp && (
                    <div className='more-info password'>
                      <BsInfoCircle className='more-info-icon color-0-2' />
                      <div className='more-info-description'>
                        <p>{defineLang('Chiều dài ít nhất 6 kí tự. Không sử dụng tiếng Việt có dấu', 'Length is must more than 6 characters. Do not use accented Vietnamese')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {errors.password && (
                <p className='error'>
                  <IoWarningOutline /> {errors.password.message}
                </p>
              )}
              {showSignUp && (
                <React.Fragment>
                  <div className='input-container confirmedPassword'>
                    <div className='input-main border-0-05'>
                      <BsKeyboard className='input-icon border-0-05 color-0-5' />
                      <input className='color-0-5 bg-color-0-01' type='password' {...register('confirmedPassword')} placeholder={defineLang('Nhập lại mật khẩu', 'Re-enter Password')} onFocus={(e) => handleFocusInput(e)} onBlur={(e) => handleBlurInput(e)} />
                      {showSignUp && (
                        <div className='more-info confirmedPassword'>
                          <BsInfoCircle className='more-info-icon color-0-2' />
                          <div className='more-info-description'>
                            <p>{defineLang('Nhập lại mật khẩu giống như bên trên một lần nữa', 'Re-enter the same password as above again')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {errors.confirmedPassword && (
                    <p className='error'>
                      <IoWarningOutline /> {errors.confirmedPassword.message}
                    </p>
                  )}
                </React.Fragment>
              )}
              {showSignUp && (
                <div className='term-container color-0-6'>
                  <label className='container w-unset'>
                    {defineLang(`Tôi đã đọc và đồng ý với các `, `I have read and agree to the `)}
                    <input className='color-0-5 bg-color-0-01' type='checkbox' checked={agreeTerm} onChange={() => setAgreeTerm(!agreeTerm)} />
                    <span className='checkmark border-0-2 bg-color-1'></span>
                  </label>
                  <a href={TERM_LINK} className='link-term' target='_blank' rel='noreferrer'>
                    {defineLang('Điều khoản', 'Terms')}
                  </a>
                </div>
              )}
              <button type='submit' className={`submit-btn ${showSignUp && 'sign-up'} ${showLogin ? '' : agreeTerm || 'disabled'} ${isVerifying && 'disabled'}`} disabled={showLogin ? false : (!agreeTerm|| isVerifying)}>
                {isVerifying ? <LoadingV2 /> : handleAuthFunc(defineLang('Đăng nhập', 'Sign in'), defineLang('Đăng ký', 'Sign up'))}
              </button>
            </form>
          </div>
          <div className='af-plugin'>
            <p className='color-0-88'>{handleAuthFunc(defineLang('Hoặc đăng nhập bằng:', 'Or sign in via:'), defineLang('Đăng nhập NCT ID:', 'Sign in with NCT ID:'))}</p>
            {showSignUp && (
              <React.Fragment>
                <div className='af-plugin-img bg-color-0-05 af-nct-login' onClick={changeAuthForm}>
                  <img src={loginLogo} alt='NCT logo' />
                </div>
                <p className='color-0-88'>{defineLang('Hoặc', 'Or')}</p>
              </React.Fragment>
            )}
            <div className='af-plugin-img bg-color-0-05 af-fb' onClick={onSignInWithFacebook}>
              <FaFacebookF />
            </div>
            <div className='af-plugin-img bg-color-0-05 af-gg' onClick={onSignInWithGoogle}>
              <FcGoogle />
            </div>
          </div>
          {showLogin && (
            <div className='signup-now mb-22px'>
              <p className='color-0-88'>
                {defineLang('Bạn chưa có tài khoản NCT ID?', "Don't have NCT ID account?")}
                <span onClick={changeAuthForm}>{defineLang(` Đăng ký ngay`, ` Sign up now`)}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthForm
