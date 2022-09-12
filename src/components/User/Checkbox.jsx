import React from 'react'
import deepEqual from 'share/deepEqual'

const Checkbox = ({ defineLang, value, setValue, tempGender }) => (
  <div className='cursor-pointer h-full flex items-center' onClick={() => setValue(value)}>
    <div className="pr-8px w-26px h-18px relative flexCenter">
      <span className='absolute left-0 -top-2px w-18px h-18px useBorder border-0-2 rounded-circle'></span>
      <span className={`absolute opacity-0 scale-0 left-3px rounded-circle bg-main w-12px h-12px overflow-hidden transition-all ${deepEqual(value, tempGender) ? 'opacity-100 scale-100' : ''}`}></span>
    </div>
    <span className='text-13px font-medium color-0-6 mr-12px'>{defineLang(value.vi, value.en)}</span>
  </div>
)

export default Checkbox