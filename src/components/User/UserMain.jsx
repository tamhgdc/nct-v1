import React, { useState, useCallback, useEffect } from 'react'

import { LineBreak, SquareImg, InfoField, IsVerify, Container, UpdateUser, ChangePassword } from 'components'
import { useTitle } from 'hooks'
import { useStore } from 'store'
import { auth } from 'config/firebase'
import { getUserDetail } from 'services/firebase/firestore'
import { Button } from '@mui/material'
import { isEmptyObject } from 'share'

const UserMain = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, en) => (state.lang === 'vi' ? vie : en), [state.lang])

  const [userDetail, setUserDetail] = useState({})
  const [currentUser, setCurrentUser] = useState(auth.currentUser || {})
  const { introduce = '', phone = '', birthday = {}, gender = {}, address = '', city = '' } = userDetail
  const { displayName = '', email = '', emailVerified = false, photoURL = '' } = currentUser
  const [isChangePass, setIsChangePass] = useState(false)

  const toggleIsChangePass = () => setIsChangePass(!isChangePass)

  useEffect(() => {
    const getUserDetailData = async () => {
      const userDetail = await getUserDetail()

      setUserDetail(userDetail)
    }

    getUserDetailData()
  }, [auth.currentUser])

  useTitle(defineLang(`${displayName} | Thông tin cá nhân - NhacCuaTui Clone`, `${displayName} | Personal Information - NhacCuaTui Clone`))

  const isVerifyProps = {
    defineLang,
    isVerify: emailVerified,
    currentUser,
  }

  const [isUpdateUser, setIsUpdateUser] = useState(false)

  const updateUserProps = {
    defineLang,
    setIsUpdateUser,
    ...userDetail,
    ...currentUser,
    setCurrentUser,
    setUserDetail,
  }

  const changePasswordProps = { defineLang, isChangePass, toggleIsChangePass }

  return (
    <div className='commonMainOutlet'>
      <Container>
        <div className='relative pt-24px px-32px'>
          {isUpdateUser ? (
            <UpdateUser {...updateUserProps} />
          ) : (
            <div>
              <div className='w3-row h-160px w-full'>
                <div className='w3-col rounded-circle sm:w-160px sm:h160px ip5:w-120px ip5:h-120px xs:w-140px xs:h-140px'>
                  <SquareImg imageUrl={photoURL} title={displayName} />
                </div>
                <div className='w3-rest pl-24px overflow-hidden'>
                  <div className='w-full h-28px text-13px leading-28px color-0-88 font-semibold'>{displayName}</div>
                  <div className='w3-row mt-24px'>
                    <Button className='w-120px h-32px text-xs mr-8px rounded-4px bg-color-0-05 color-0-5 normal-case' onClick={() => setIsUpdateUser(true)}>
                      {defineLang('Cập nhật', 'Update')}
                    </Button>
                    <Button className='w-120px h-32px text-xs mr-8px rounded-4px bg-color-0-05 color-0-5 normal-case ip5:mt-8px sm:mt-0' onClick={toggleIsChangePass}>{defineLang('Đổi mật khẩu', 'Change password')}</Button>
                    <ChangePassword { ... changePasswordProps } />
                  </div>
                </div>
              </div>
              <LineBreak styles='mt-24px' />
              <div className='mt-28px text-22px font-bold color-0-88'>{defineLang('Thông tin cá nhân', 'Profile')}</div>
              <InfoField title={defineLang('Tên tài khoản', 'Username')} value={displayName} styles='mt-16px' />
              <InfoField title='Email' value={email} extraComp={<IsVerify {...isVerifyProps} />} />
              <InfoField title={defineLang('Sinh nhật', 'Birthday')} value={isEmptyObject(birthday) ? defineLang('Chưa cập nhật', 'Not Update') : `${birthday.day}/${birthday.month}/${birthday.year}`} />
              <InfoField title={defineLang('Giới tính', 'Gender')} value={isEmptyObject(gender) ? defineLang('Chưa cập nhật', 'Not Update') : defineLang(gender.vi, gender.en)} />
              <InfoField title={defineLang('Địa chỉ', 'Address')} value={address || defineLang('Chưa cập nhật', 'Not Update')} />
              <InfoField title={defineLang('Thành phố', 'City')} value={city || defineLang('Chưa cập nhật', 'Not Update')} />
              <InfoField title={defineLang('Số điện thoại', 'Phone number')} value={phone || defineLang('Chưa cập nhật', 'Not Update')} />
              <InfoField title={defineLang('Giới thiệu', 'Introduce')} value={introduce || defineLang('Chưa cập nhật', 'Not Update')} valueStyles='break-words' />
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default UserMain
