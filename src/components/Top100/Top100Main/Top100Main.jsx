import React, { useState, useEffect, useCallback } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

import { Title, CateCommon, CateBasic } from 'components'
import { top100Cate } from 'share/Categories'
import { createTop100Url } from 'share/utilities'
import { useStore } from 'store'

const Top100Main = () => {
  const params = useParams()
  const query = new URLSearchParams(params.top100Id)

  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const navigate = useNavigate()

  const [curCate, setCurCate] = useState(top100Cate[0].value)
  const [curSubCate, setCurSubCate] = useState(top100Cate[0].subCate[0].value)
  const [curSubCateTitle, setCurSubCateTitle] = useState({})
  const [curShowSubCate, setCurShowSubCate] = useState(top100Cate[0].subCate)
  const [count, setCount] = useState(20)

  const navTop100Cate = () => {
    const currentSubCate = curShowSubCate.filter((cate) => cate.value === curSubCate)[0]
    const { title, value } = currentSubCate

    setCurSubCateTitle(title)
    navigate(createTop100Url(defineLang(title.vi, title.en), value))
  }

  useEffect(() => {
    navTop100Cate()
  }, [curCate, curSubCate])

  useEffect(() => {
    top100Cate.forEach((item, i) => {
      item.subCate.forEach((sub) => {
        if (sub.value === query.get('k')) {
          const { title, value, mainCate } = sub

          setCurCate(mainCate)
          setCurSubCate(value)
          setCurSubCateTitle(title)
          setCurShowSubCate(top100Cate[i].subCate)
          navigate(createTop100Url(defineLang(title.vi, title.en), value))
        }
      })
    })
  }, [])

  const handleTop100Cate = (position) => {
    setCurSubCate(top100Cate[position].subCate[0].value)
    setCurShowSubCate(top100Cate[position].subCate)
    setCount(20)
  }

  const handleCateChange = (e, newCate) => {
    setCurCate(newCate)
    switch (newCate) {
      case 'vietnam':
        handleTop100Cate(0)
        break
      case 'usuk':
        handleTop100Cate(1)
        break
      case 'asia':
        handleTop100Cate(2)
        break
      case 'no-lyric':
        handleTop100Cate(3)
        break
      default:
        break
    }
  }

  const handleSubCateChange = (newCate) => {
    setCurSubCate(newCate)
    setCount(20)
  }

  const cateCommonProps = {
    defineLang,
    curCate,
    handleCateChange,
    categories: top100Cate,
  }

  const cateBasicProps = {
    defineLang,
    curCate: curSubCate,
    handleCateChange: handleSubCateChange,
    categories: curShowSubCate,
  }

  const outletContext = [defineLang, curSubCateTitle, count, setCount, curSubCate]

  return (
    <div className='commonMainOutlet'>
      <Title title={defineLang('Top 100 ca khúc hay nhất | NhacCuaTui Clone', 'Top 100 best songs | NhacCuaTui Clone')} />
      <div className='pt-16px'>
        <CateCommon {...cateCommonProps} />
      </div>
      <div className='py-8'>
        <CateBasic {...cateBasicProps} />
      </div>
      <Outlet context={outletContext} />
    </div>
  )
}

export default Top100Main
