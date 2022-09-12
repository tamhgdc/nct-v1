import React from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const DropDown = ({ value, setValue, array, styles = '' }) => {

  const selectProps = {
    className: 'appearance-none bg-color-0-02 color-0-88 text-13px font-medium px-4 w-full h-full outline-0 useBorder border-0-05 cursor-pointer rounded-4px',
    value,
    onChange: (e) => setValue(e.target.value)
  }

  return (
    <div className={styles} >
      <div className='relative h-full z-0'>
        <select { ... selectProps }>
          {array.map((option) => (
            <option key={option} value={option} className='text-13px text-slate-900 py-16px px-13px'>{option}</option>
          ))}
        </select>
        <MdOutlineKeyboardArrowDown className='text-13px absolute color-0-5 top-px right-12px font-medium h-16 leading-16 cursor-pointer' />
      </div>
    </div>
  )
}

export default DropDown
