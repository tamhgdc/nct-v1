import React from 'react'

const BallCheckbox = ({ title, styles = '', labelStyles = '', ballStyles = '', isActive, handleClick }) => (
  <div className={`w-32px h-16px relative ${styles}`}>
    <input id={title} type='checkbox' name={title} className='opacity-0' />
    <label htmlFor={title} className={`absolute top-0 left-0 bg-color-0-2 w-32px h-16px rounded-16px transition-colors ${labelStyles} ${isActive && '!bg-main'}`} onClick={handleClick}>
      <span className={`block w-14px h-14px rounded-circle cursor-pointer absolute top-px z-1 left-px bg-slate-100 transition-all shadow ${ballStyles} ${isActive && 'left-[1.7rem]'}`}></span>
    </label>
  </div>
)

export default BallCheckbox
