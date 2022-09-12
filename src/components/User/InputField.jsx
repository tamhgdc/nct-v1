import React, { useState } from 'react'

const InputField = ({ label = '', value, setValue, placeholder = '', extInputProps = {}, styles = '' }) => {
  const [isFocus, setIsFocus] = useState(false)

  const inputProps = {
    className: 'text-13px font-medium w-full color-0-88 pl-4 outline-0',
    type: 'text',
    value: value,
    onChange: (e) => setValue(e.target.value),
    onFocus: () => setIsFocus(true),
    onBlur: () => setIsFocus(false),
    placeholder: placeholder || label,
  }

  return (
    <div className={`update-user-field ${styles}`}>
      <p className='update-user-label'>{label}:</p>
      <div className='update-user-input'>
        <div className='sm:w-360px ip5:w-240px h-16'>
          <div className={`flex items-center w-full h-full transition-colors useBorder border-0-05 rounded-4px bg-color-0-02 ${isFocus && '!border-main'}`}>
            <input {...inputProps} {...extInputProps} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputField
