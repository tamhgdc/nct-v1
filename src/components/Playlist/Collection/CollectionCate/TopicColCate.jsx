import React, { useState, useRef, useCallback } from 'react'

import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { FullColCate } from 'components'
import { useOnClickOutside } from 'hooks'
import { BsCheck } from 'react-icons/bs'

const TopicColCate = ({ defineLang, title, value: topicValue, mainCate, subCate, colCate, handleAddColCate }) => {
  const [loadMore, setLoadMore] = useState(false)

  const toggleLoadMore = () => {
    setLoadMore(!loadMore)
  }

  const parentRef = useRef(null)
  const fullColCateRef = useRef(null)

  useOnClickOutside(fullColCateRef, parentRef, toggleLoadMore)

  const onChangeColCate = (cate) => {
    handleAddColCate(cate, topicValue)
    toggleLoadMore()
  }

  const isActiveCate = useCallback((cateValue) => (colCate.filter((collect) => collect.value.value === cateValue).length !== 0 ? true : ''), [colCate])

  const fullColCateProps = {
    defineLang,
    ref: fullColCateRef,
    subCate,
    colCate,
    onChangeColCate,
    isActiveCate,
  }

  return (
    <div className='w3-quarter'>
      <div className='text-sm font-bold uppercase color-0-88 pt-3 pb-5 pl-16px'>{defineLang(title.vi, title.en)}</div>
      {mainCate.map((cate) => {
        const { title, value } = cate
        return (
          <div key={value} className={`collection-cate ${isActiveCate(value) && '!text-main font-semibold'}`} onClick={() => handleAddColCate(cate, topicValue)}>
            {isActiveCate(value) ? <BsCheck className='!text-main' /> : <MdOutlineKeyboardArrowRight />}
            <div className='w3-rest truncate' title={defineLang(title.vi, title.en)}>
              {defineLang(title.vi, title.en)}
            </div>
          </div>
        )
      })}
      <div className='collection-cate'>
        <MdOutlineKeyboardArrowDown />
        <div className='w3-rest truncate' title={defineLang('Thêm', 'Load more')} onClick={toggleLoadMore} ref={parentRef}>
          {defineLang('Thêm...', 'Load more...')}
        </div>
      </div>
      {loadMore && <FullColCate {...fullColCateProps} />}
    </div>
  )
}

export default TopicColCate
