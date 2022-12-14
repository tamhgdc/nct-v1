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

      toastNotify(defineLang('????ng nh???p th??nh c??ng.', 'Sign in successfully.'), 'success')
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

      toastNotify(defineLang('????ng k?? th??nh c??ng.', 'Sign up successfully.'), 'success')

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
      toastNotify(defineLang('????ng nh???p th??nh c??ng.', 'Sign in successful.'), 'success')
      if (showLogin) {
        toggleShowLogin()
      } else if (showSignUp) {
        toggleShowSignUp()
      }
    } catch (error) {
      toastNotify(defineLang('????ng nh???p kh??ng th??nh c??ng.', 'Sign in unsuccessful.'), 'error')
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
      toastNotify(defineLang('????ng nh???p th??nh c??ng.', 'Sign in successful.'), 'success')

      if (showLogin) {
        toggleShowLogin()
      } else if (showSignUp) {
        toggleShowSignUp()
      }
    } catch (error) {
      toastNotify(defineLang('????ng nh???p kh??ng th??nh c??ng.', 'Sign in unsuccessful.'), 'error')
    }
  }
  
  return (
    <div className='af-container sm:w-460px ip5:w-380px' onClick={(e) => e.stopPropagation()}>
      <div className='af-main bg-color-1'>
        <div className='af-header border-0-05 color-0-88'>
          <h4>{lang === 'vi' ? handleAuthFunc('????ng nh???p', '????ng k??') : handleAuthFunc('Sign in', 'Sign up')}</h4>
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
                      <input className='color-0-5 bg-color-0-01' type='text' {...register('username')} placeholder={defineLang('T??n hi???n th???', 'Username')} onFocus={(e) => handleFocusInput(e)} onBlur={(e) => handleBlurInput(e)} />
                      {showSignUp && (
                        <div className='more-info username'>
                          <BsInfoCircle className='more-info-icon color-0-2' />
                          <div className='more-info-description'>
                            <p>{defineLang('B???n c?? th??? s??? d???ng ch??? c??i, ch??? s???, g???ch d?????i v?? d???u ch???m. Chi???u d??i t???i ??a 30 k?? t???', 'You can use letters, numbers, underscores and dots. Length from 30 characters')}</p>
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
                        <p>{defineLang('??i???n v??o Email b???n mu???n s??? d???ng cho t??i kho???n n??y', 'Fill in the Email you want to use for this account')}</p>
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
                  <input className='color-0-5 bg-color-0-01' type='password' {...register('password')} placeholder={defineLang('M???t kh???u', 'Password')} onFocus={(e) => handleFocusInput(e)} onBlur={(e) => handleBlurInput(e)} />
                  {showSignUp && (
                    <div className='more-info password'>
                      <BsInfoCircle className='more-info-icon color-0-2' />
                      <div className='more-info-description'>
                        <p>{defineLang('Chi???u d??i ??t nh???t 6 k?? t???. Kh??ng s??? d???ng ti???ng Vi???t c?? d???u', 'Length is must more than 6 characters. Do not use accented Vietnamese')}</p>
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
                      <input className='color-0-5 bg-color-0-01' type='password' {...register('confirmedPassword')} placeholder={defineLang('Nh???p l???i m???t kh???u', 'Re-enter Password')} onFocus={(e) => handleFocusInput(e)} onBlur={(e) => handleBlurInput(e)} />
                      {showSignUp && (
                        <div className='more-info confirmedPassword'>
                          <BsInfoCircle className='more-info-icon color-0-2' />
                          <div className='more-info-description'>
                            <p>{defineLang('Nh???p l???i m???t kh???u gi???ng nh?? b??n tr??n m???t l???n n???a', 'Re-enter the same password as above again')}</p>
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
                    {defineLang(`T??i ???? ?????c v?? ?????ng ?? v???i c??c `, `I have read and agree to the `)}
                    <input className='color-0-5 bg-color-0-01' type='checkbox' checked={agreeTerm} onChange={() => setAgreeTerm(!agreeTerm)} />
                    <span className='checkmark border-0-2 bg-color-1'></span>
                  </label>
                  <a href={TERM_LINK} className='link-term' target='_blank' rel='noreferrer'>
                    {defineLang('??i???u kho???n', 'Terms')}
                  </a>
                </div>
              )}
              <button type='submit' className={`submit-btn ${showSignUp && 'sign-up'} ${showLogin ? '' : agreeTerm || 'disabled'} ${isVerifying && 'disabled'}`} disabled={showLogin ? false : (!agreeTerm|| isVerifying)}>
                {isVerifying ? <LoadingV2 /> : handleAuthFunc(defineLang('????ng nh???p', 'Sign in'), defineLang('????ng k??', 'Sign up'))}
              </button>
            </form>
          </div>
          <div className='af-plugin'>
            <p className='color-0-88'>{handleAuthFunc(defineLang('Ho???c ????ng nh???p b???ng:', 'Or sign in via:'), defineLang('????ng nh???p NCT ID:', 'Sign in with NCT ID:'))}</p>
            {showSignUp && (
              <React.Fragment>
                <div className='af-plugin-img bg-color-0-05 af-nct-login' onClick={changeAuthForm}>
                  <img src={loginLogo} alt='NCT logo' />
                </div>
                <p className='color-0-88'>{defineLang('Ho???c', 'Or')}</p>
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
                {defineLang('B???n ch??a c?? t??i kho???n NCT ID?', "Don't have NCT ID account?")}
                <span onClick={changeAuthForm}>{defineLang(` ????ng k?? ngay`, ` Sign up now`)}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthForm
