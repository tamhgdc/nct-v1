import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import InfiniteScroll from 'react-infinite-scroll-component'
import blur_layer from 'images/blur/blur_layer_v1.png'

import { BlurImg, Footer, LoadingV2, Sharing, SongRanking } from 'components'
import { getTop100Item } from 'services/Top100/Top100'
import { getCurrentPathname, handleCopyProxy, handlePlayNewSong } from 'share/utilities'
import { toastNotify } from 'share/toast'
import { useStore, actions } from 'store'

const Top100Item = () => {
  const [state, dispatch] = useStore()
  const [defineLang, top100Title, count, setCount, curSubCate] = useOutletContext()

  const [top100, setTop100] = useState(null)
  const [renderSongs, setRenderSongs] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const loadMoreItem = () => {
    setCount((count) => count + 20)
    setRenderSongs(top100.songs.slice(0, count))
  }

  useEffect(() => {
    try {
      setIsLoading(true)
      const getTop100State = async () => {
        const top100 = await getTop100Item(curSubCate)

        setTop100(top100)
        setRenderSongs(top100.songs.slice(0, count))
        setIsLoading(false)
      }
      getTop100State()
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [curSubCate])

  if (isLoading)
    return (
      <div className='flex items-center justify-center w-full h-[calc(100vh_-_13rem)]'>
        <LoadingV2 />
      </div>
    )

  if (!top100) return null

  const handleCopyShare = () => {
    handleCopyProxy(defineLang, getCurrentPathname())
  }

  const onShareWindowClose = () => {
    toastNotify(defineLang('Chia sẻ lên facebook thành công', 'Share to facebook successfully'), 'success')
  }

  const sharingProps = {
    defineLang,
    placement: 'top',
    handleCopyShare,
    onShareWindowClose,
    shareLink: getCurrentPathname(),
    shareClass: '!text-white/70',
  }

  const infiniteSrcollProps = {
    dataLength: count,
    next: loadMoreItem,
    hasMore: count !== 120,
  }

  const blurImgProps = {
    img: top100.songs[0].thumbnail || blur_layer,
    blurRadius: 100,
    className: 'relative h-full w-full'
  }

  return (
    <div>
      <div className='relative w-full h-[94px] mt-16 mb-9'>
        <BlurImg { ... blurImgProps } />
        <div className='flex absolute items-center justify-between top-0 left-0 w-full h-full py-12px px-32px text-slate-100/90'>
          <div>
            <h2 className='text-3xl font-bold'>TOP 100</h2>
            <p className='mt-2.5 text-slate-100/60 uppercase text-13px font-medium'>
              {defineLang(top100Title.vi, top100Title.en)} -{' '}
              <span className='normal-case'>
                {defineLang('Cập nhật vào: ', 'Updated at: ')}
                {top100.dateModify}
              </span>
            </p>
          </div>
          <div className='flex items-center'>
            <div className='flex justify-center items-center sm:w-64 ip5:w-40 h-32px rounded-16px useBorder border-white/10 font-semibold cursor-pointer fz-13px text-white/50 hover:border-main hover:text-main transition-colors' onClick={() => handlePlayNewSong(renderSongs[0].key, dispatch, actions, state.curPlaylist, true, defineLang)}>{defineLang('Phát tất cả', 'Play all')}</div>
            <div className='ml-14px'>
              <Sharing {...sharingProps} />
            </div>
          </div>
        </div>
      </div>
      <div className='relative mt-10 margin-footer'>
        <ul>
          <InfiniteScroll {...infiniteSrcollProps}>
            {renderSongs.map((item, i) => (
              <SongRanking {...item} position={i + 1} songKey={item.key} defineLang={defineLang} />
            ))}
          </InfiniteScroll>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default Top100Item
