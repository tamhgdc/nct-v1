import React, { useState } from 'react'

import vnCityProv from 'share/vnCityProv'
import Button from '@mui/material/Button'
import isEmptyObject from 'share/isEmptyObject'
import no_user_img from 'images/default/default_user.jpg'
import { Image, InputField, DropDown, Checkbox } from 'components'
import { dayArr, genderArr, monthArr, yearArr } from 'services/User/UpdateUser'
import { updateUserInfo } from 'services/firebase/firestore'
import { toastNotify } from 'share/toast'
import { storage } from 'config/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { randomId } from 'share'

const UpdateUser = ({ defineLang, photoURL = '', displayName = '', email = '', address = '', phone = '', introduce = '', birthday = {}, gender = {}, city = '', setIsUpdateUser, setCurrentUser, setUserDetail }) => {
  const { day = '', month = '', year = '' } = birthday

  const [tempAvatar, setTempAvatar] = useState(photoURL)
  const [avatarFile, setAvatarFile] = useState(null)

  const [tempUsername, setTempUsername] = useState(displayName)
  const [tempAddress, setTempAddress] = useState(address)
  const [tempPhone, setTempPhone] = useState(phone)
  const [tempDay, setTempDay] = useState(day || dayArr[0])
  const [tempMonth, setTempMonth] = useState(month || monthArr[0])
  const [tempYear, setTempYear] = useState(year || yearArr[0])
  const [tempCity, setTempCity] = useState(city || vnCityProv[0])
  const [tempGender, setTempGender] = useState(isEmptyObject(gender) ? genderArr[0] : gender)

  const [tempIntroduce, setTempIntroduce] = useState(introduce)
  const [isFocusIntro, setIsFocusIntro] = useState(false)

  const handleTempImage = (e) => {
    if (e.target.files[0]) {
      setAvatarFile(e.target.files[0])
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setTempAvatar(reader.result)
        }
      }
      reader.onerror = () => toastNotify(defineLang('Vui lòng chọn ảnh hợp lệ.', 'Please select a valid image.'))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const usernameInputProps = {
    label: defineLang('Tên tài khoản', 'Username'),
    value: tempUsername,
    setValue: setTempUsername,
  }

  const emailInputProps = {
    label: 'Email',
    value: email,
    extInputProps: {
      disabled: true,
    },
  }

  const addressInputProps = {
    label: defineLang('Địa chỉ', 'Address'),
    value: tempAddress,
    setValue: setTempAddress,
  }

  const phoneInputProps = {
    label: defineLang('Số điện thoại', 'Phone number'),
    value: tempPhone,
    extInputProps: {
      type: 'number',
      max: 11,
      onChange: (e) => e.target.value.length < 12 && setTempPhone(e.target.value),
    },
  }

  const handleUpdateUser = () => {
    if (tempAvatar !== photoURL && avatarFile) {
      const userImageRef = ref(storage, `user/images/${avatarFile.name}-${tempUsername}-${randomId(6)}`)
      uploadBytes(userImageRef, avatarFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => updateUserInfo('photoURL', url, setCurrentUser, true))
      })
    }

    if (tempUsername !== displayName) {
      updateUserInfo('displayName', tempUsername, setCurrentUser, true)
    }

    if (tempDay !== day || tempMonth !== month || tempYear !== year) {
      updateUserInfo('birthday', { day: tempDay, month: tempMonth, year: tempYear }, setUserDetail)
    }

    if (tempGender !== gender) {
      updateUserInfo('gender', tempGender, setUserDetail)
    }

    if (tempAddress !== address) {
      updateUserInfo('address', tempAddress, setUserDetail)
    }

    if (tempCity !== city) {
      updateUserInfo('city', tempCity, setUserDetail)
    }

    if (tempPhone !== phone) {
      updateUserInfo('phone', tempPhone, setUserDetail)
    }

    if (tempIntroduce !== introduce) {
      updateUserInfo('introduce', tempIntroduce.trim(), setUserDetail)
    }

    setIsUpdateUser(false)
  }

  const introTextareaProps = {
    className: `text-13px bg-color-0-02 font-medium w-full h-full color-0-88 pl-4 outline-0 p-16px rounded-4px useBorder border-0-05 resize-none ${isFocusIntro && '!border-main'}`,
    onFocus: () => setIsFocusIntro(true),
    onBlur: () => setIsFocusIntro(false),
    label: defineLang('Giới thiệu', 'Introduce'),
    value: tempIntroduce,
    onChange: (e) => setTempIntroduce(e.target.value),
    placeholder: defineLang('Giới thiệu', 'Introduce'),
    rows: 3,
    spellCheck: false,
  }

  return (
    <div>
      <div className='mt-28px text-22px font-bold color-0-88'>{defineLang('Cập Nhật Thông Tin', 'Update Profile')}</div>
      <div className='mt-24px'>
        <div className='update-user-field'>
          <p className='update-user-label'>{defineLang('Hình đại diện', 'Avatar')}:</p>
          <Image className='w-64px h-64px rounded-4px mr-17px' imageUrl={tempAvatar} backupImg={no_user_img} />
          <div>
            <input type='file' id='user-thumb' name='user-thumbnail' accept='image/*' className='hidden' onChange={handleTempImage} />
            <label htmlFor='user-thumb'>
              <div className='w-48 h-32px text-xs min-w-48 mt-4px mb-8px mr-8px rounded-4px normal-case py-6px px-8px flexCenter bg-color-0-05'>
                <span className='color-0-5 font-medium'>{defineLang('Chọn file', 'Choose file')}</span>
              </div>
            </label>
          </div>
        </div>
        <InputField {...usernameInputProps} />
        <InputField {...emailInputProps} />
        <div className='update-user-field'>
          <p className='update-user-label'>{defineLang('Sinh nhật', 'Birthday')}:</p>
          <div className='update-user-input'>
            <div className='sm:w-360px h-16 ip5:w-240px flex'>
              <DropDown value={tempDay} setValue={setTempDay} array={dayArr} styles='w-[11.2rem] rounded-4px h-42px ml-12px first:ml-0' />
              <DropDown value={tempMonth} setValue={setTempMonth} array={monthArr} styles='w-[11.2rem] rounded-4px h-42px ml-12px first:ml-0' />
              <DropDown value={tempYear} setValue={setTempYear} array={yearArr} styles='w-[11.2rem] rounded-4px h-42px ml-12px first:ml-0' />
            </div>
          </div>
        </div>
        <div className='update-user-field'>
          <p className='update-user-label'>{defineLang('Giới tính', 'Gender')}:</p>
          <div className='update-user-input'>
            <div className='sm:w-360px h-16 ip5:w-240px flex'>
              {genderArr.map((sex) => (
                <Checkbox key={sex.en} defineLang={defineLang} tempGender={tempGender} value={sex} setValue={setTempGender} />
              ))}
            </div>
          </div>
        </div>
        <InputField {...addressInputProps} />
        <div className='update-user-field'>
          <p className='update-user-label'>{defineLang('Tỉnh/Thành phố', 'Province/City')}:</p>
          <div className='update-user-input'>
            <div className='sm:w-360px h-16 ip5:w-240px flex'>
              <DropDown value={tempCity} setValue={setTempCity} array={vnCityProv} styles='w-full h-full' />
            </div>
          </div>
        </div>
        <InputField {...phoneInputProps} />
        <div className='update-user-field'>
          <p className='update-user-label'>{defineLang('Giới thiệu', 'Introduce')}:</p>
          <div className='update-user-input'>
            <div className='sm:w-360px ip5:w-240px h-32'>
              <textarea {...introTextareaProps} />
            </div>
          </div>
        </div>
        <div className='update-user-field'>
          <div className='flex items-center justify-end w-[46.8rem] h-16'>
            <Button className='sm:w-120px ip5:w-120px sm:h-16 ip5:h-14 text-xs mr-8px rounded-4px bg-color-0-05 color-0-5 normal-case hover-bg-color-0-08 font-medium' onClick={() => setIsUpdateUser(false)}>
              {defineLang('Hủy', 'Cancel')}
            </Button>
            <Button className='sm:w-120px ip5:w-120px sm:h-16 ip5:h-14 text-xs sm:ml-28px ip5:ml-8px rounded-4px bg-mainV2 text-slate-100 normal-case font-medium' onClick={handleUpdateUser}>
              {defineLang('Cập nhật', 'Update')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateUser
