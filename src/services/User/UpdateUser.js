import * as Yup from 'yup'
import { toastNotify } from 'share/toast'
import { REGEX_VIETNAMESE } from 'share/constants'

const arrOfInt = (first, last) => {
  const list = []
  for (let i = first; i <= last; i++) {
    list.push(i >= 10 ? i : `0${i}`)
  }

  return list
}

const dayArr = arrOfInt(1, 30)

const monthArr = arrOfInt(1, 12)

const yearArr = arrOfInt(1960, new Date().getFullYear())

export { dayArr, monthArr, yearArr }

export const genderArr = [
  { vi: 'Nam', en: 'Male' },
  { vi: 'Nữ', en: 'Female' },
  { vi: 'Khác', en: 'Other' },
]