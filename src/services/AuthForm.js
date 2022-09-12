import * as Yup from 'yup'
import { REGEX_VIETNAMESE, REGEX_EMAIL, EXISTED_EMAIL, USER_NOT_FOUND, WRONG_PASSWORD } from 'share/constants'
import { toastNotify } from 'share/toast'

export const authSchema = (defineLang, handleAuthFunc) => {
  const emailSchema = Yup.string().required(defineLang('Vui lòng điền vào trường này.', 'Email is required.')).matches(REGEX_EMAIL, defineLang('Email không hợp lệ.', 'Invalid email.')).trim(defineLang('Email không hợp lệ.', 'Invalid email'))

  const passwordSchema = Yup.string().required(defineLang('Vui lòng điền vào trường này.', 'Password is required.')).trim(defineLang('Mật khẩu không hợp lệ.', 'Invalid password')).min(6, defineLang('Mật khẩu chứa ít nhất 6 ký tự', 'Password must contain at least 6 characters')).matches(REGEX_VIETNAMESE, defineLang('Vui lòng không sử dụng Tiếng Việt', 'Please do not use Vietnamese accented'))

  const usernameSchema = Yup.string().required(defineLang('Vui lòng điền vào trường này.', 'Username is required.')).max(30, defineLang('Tên người dùng phải ít hơn 30 ký tự.', 'Username is must less than 30 characters.'))

  const confirmedPasswordSchema = Yup.string()
    .required(defineLang('Vui lòng điền vào trường này.', 'Re-enter password is required.'))
    .trim(defineLang('Mật khẩu không hợp lệ.', 'Invalid password'))
    .oneOf([Yup.ref('password'), null], defineLang('Mật khẩu nhập lại không đúng.', 'Incorrect re-enter password.'))

  const loginSchema = Yup.object().shape({
    email: emailSchema,
    password: passwordSchema,
  })

  const signUpSchema = Yup.object().shape({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmedPassword: confirmedPasswordSchema,
  })

  return handleAuthFunc(loginSchema, signUpSchema)
}

export const handleSignUpError = (error, defineLang) => {
  switch (error) {
    case EXISTED_EMAIL:
      toastNotify(defineLang('Email đã được sử dụng bởi một người dùng khác', 'There is already an account for this email address'), 'error')
      break
    default:
      break
  }
}

export const handleLoginError = (error, defineLang) => {
  switch (error) {
    case USER_NOT_FOUND:
      toastNotify(defineLang('Không tìm thấy email hoặc email chưa được đăng ký', 'Email not found or unregistered email'), 'error')
      break
    case WRONG_PASSWORD:
      toastNotify(defineLang('Sai mật khẩu, vui lòng thử lại.', 'Wrong password, please try again.'), 'error')
      break
    default:
      break
  }
}

export const changePassSchema = (defineLang) => {
  const oldPasswordSchema = Yup.string().required(defineLang('Vui lòng điền vào trường này.', 'Old password is required.')).trim(defineLang('Vui lòng không để các khoảng trống.', 'Invalid password'))

  const newPasswordSchema = Yup.string()
    .required(defineLang('Vui lòng điền vào trường này.', 'New password is required.'))
    .trim(defineLang('Vui lòng không để các khoảng trống.', 'Invalid password'))
    .min(6, defineLang('Mật khẩu chứa ít nhất 6 ký tự', 'Password must contain at least 6 characters'))
    .matches(REGEX_VIETNAMESE, defineLang('Vui lòng không sử dụng Tiếng Việt', 'Please do not use Vietnamese accented'))
    .notOneOf([Yup.ref('oldPassword'), null], defineLang('Mật khẩu mới phải khác mật khẩu cũ.', 'The new password must be different from an old one.'))

  const confirmNewPasswordSchema = Yup.string()
    .required(defineLang('Vui lòng điền vào trường này.', 'Re-enter password is required.'))
    .trim(defineLang('Vui lòng không để các khoảng trống.', 'Invalid password'))
    .oneOf([Yup.ref('newPassword'), null], defineLang('Mật khẩu nhập lại không đúng.', 'Incorrect re-enter password.'))

  const changePasswordSchema = Yup.object().shape({
    oldPassword: oldPasswordSchema,
    newPassword: newPasswordSchema,
    confirmNewPassword: confirmNewPasswordSchema,
  })

  return changePasswordSchema
}
