import React from 'react'
import './Navbar.scss'

const Navbar = ({ defineLang, curCate, handleCateChange, categories }) => {
  const isActiveCate = (cate) => curCate === cate

  return (
    <div className='navbar'>
      <div className='navbar-menu border-0-05'>
        {categories.map((cate) => (
          <div key={cate.value} className='navbar-item sm:text-sm ip5:text-13px color-0-88' onClick={() => handleCateChange(cate.value)}>
            {defineLang(cate.title.vi, cate.title.en)}
            <div className={`navbar-active ${isActiveCate(cate.value) && 'is-active'}`}></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Navbar
