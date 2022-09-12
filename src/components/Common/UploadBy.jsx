import React from 'react'

const UploadBy = ({ styles = '', uploadStyles = '', nameStyles = '', uploadBy, defineLang }) => (uploadBy && (
  <div className={`mt-7 leading-24px text-sm ${styles}`}>
    <span className={`color-0-5 ${uploadStyles}`}>{defineLang('Đăng tải bởi: ', 'Uploaded by: ')}</span>
    <span className={`text-main ${nameStyles}`}>{uploadBy.fullName}</span>
  </div>
))

export default UploadBy
