import React from 'react'
import './Select.scss'

import { RiArrowDownSLine } from 'react-icons/ri'

const Select = ({ defineLang, options, selectValue, handleChange }) => {
  return (
    <div className="select-common-container">
      <select className='bg-color-0-02 color-0-88 border-0-05' value={selectValue} 
      onChange={handleChange} >
        {options.map(option => (
          <option key={option.value} value={option.value}>{defineLang(option.title.vi, option.title.en)}</option>
        ))}
      </select>
      <div className='dropdown color-0-5'>
        <RiArrowDownSLine />
      </div>
    </div>
  )
}

export default Select