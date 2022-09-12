import React from 'react'
import './CateBasic.scss'

const CateBasic = ({ defineLang, curCate, handleCateChange, categories }) => (
  <div className='cate-basic-container flexCenter flex-wrap'>
    {categories.map((cate) => {
      const { title, value } = cate

      return (
        <div key={value} className={`cate-basic-item color-0-88 ${curCate === value && 'activeCate'}`} onClick={() => handleCateChange(value, title)}>
          {defineLang(title.vi, title.en)}
        </div>
      )
    })}
  </div>
)

export default CateBasic
