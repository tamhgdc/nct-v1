import React from 'react'
import './PagiCommon.scss'

import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md'
import { usePagination } from '@mui/material'
import onScrollToTop from 'share/scrollToTop'
import useWindowSize from 'hooks/useWindowSize'

const PagiCommon = ({ pageIndex, setPageIndex, count, defineLang }) => {
  const size = useWindowSize()

  const handleChangePage = (e, page) => {
    setPageIndex(page)
    onScrollToTop()
  }

  const { items } = usePagination({
    count,
    siblingCount: size.width > 650 ? 2 : 1,
    onChange: handleChangePage,
    page: pageIndex,
  })

  const defineTitle = (type) => {
    switch (type) {
      case 'previous':
        return defineLang('Trang trước', 'Previous page')
      case 'next':
        return defineLang('Trang kế', 'Next page')
      default:
        return ''
    }
  }

  const defineChildren = ({ page, type, selected, disabled, ...item }) => {
    switch (type) {
      case 'start-ellipsis':
        return <div className='pagi-btn md:w-16 md:h-16 ip6:w-14 ip6:h-14 ip5:w-8 ip5:h-8 start-ellipsis ellipsis'>...</div>
      case 'end-ellipsis':
        return <div className='pagi-btn md:w-16 md:h-16 ip6:w-14 ip6:h-14 ip5:w-8 ip5:h-8 end-ellipsis ellipsis'>...</div>
      case 'previous':
        return (
          <div className={`pagi-btn md:w-16 md:h-16 ip6:w-14 ip6:h-14 ip5:w-8 ip5:h-8 previous-btn border-0-05 nav-btn ${disabled && 'disabled color-0-2'}`} {...item}>
            <MdOutlineArrowBackIosNew />
          </div>
        )
      case 'next':
        return (
          <div className={`pagi-btn md:w-16 md:h-16 ip6:w-14 ip6:h-14 ip5:w-8 ip5:h-8 next-btn border-0-05 nav-btn ${disabled && 'disabled color-0-2'}`} {...item}>
            <MdOutlineArrowForwardIos />
          </div>
        )
      case 'page':
        return (
          <div className={`pagi-btn md:w-16 md:h-16 ip6:w-14 ip6:h-14 ip5:w-8 ip5:h-8 page-btn page-common ${selected && 'selected'}`} {...item}>
            {page}
          </div>
        )
      default:
        break
    }
  }

  return (
    <div className='pagi-common-container color-0-5'>
      <ul className='ul-pagination border-0-1'>
        {items.map((item, index) => {
          return (
            <li key={index} title={defineTitle(item.type)}>
              {defineChildren(item)}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PagiCommon
