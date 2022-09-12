import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { CircleTitleArtist, ExtendModal, ModalAnimate, OptionModal } from 'components'

import { FaRegTrashAlt } from 'react-icons/fa'
import { BsPlayCircleFill } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'

import { Loading } from 'components'
import { createSearchUrl } from 'services/Search/SearchHeader'
import { handleNavSearch } from 'services/Search/Search'
import { getMaybeHit } from 'services/Search/SearchMain'
import { covertTimestamp, createArtistUrl, createSongUrl, handleCopySong, handlePlayNewSong } from 'share/utilities'
import { GoCalendar } from 'react-icons/go'
import { basicModal } from 'share/animation'
import { handleAddToFavSong } from 'share/addToFav'

const SearchMain = ({ defineLang, trendingKeywords = [], searchHistory, setSearchHistory, setSearchTerm, isLoading, actions, dispatch, curPlaylist }) => {
  const navigate = useNavigate()

  const [maybeHit, setMaybeHit] = useState(null)
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  useEffect(() => {
    try {
      const getMaybeHitState = async () => {
        const maybeHit = await getMaybeHit()

        setMaybeHit(maybeHit)
      }
      setSearchTerm('')
      getMaybeHitState()
    } catch (error) {
      throw new Error(error)
    }
    document.title = defineLang('Tìm kiếm  bài hát - Playlist - MV', 'Search for song - Playlist - MV')
  }, [])

  const positionRef = useRef(null)
  const moreDivRef = useRef(null)

  const toggleShowMore = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleMoreOptions = (e) => {
    e.stopPropagation()
    toggleShowMore()
  }

  if (!maybeHit) return null

  const onCopyLink = (e, title, songId) => {
    toggleShowMore()
    handleCopySong(e, defineLang, title, songId)
  }

  const handleGoToSong = (e, title, songId) => {
    e.stopPropagation()
    navigate(createSongUrl(title, songId))
  }

  const handleAddToFav = (e) => {
    e.stopPropagation()
    handleAddToFavSong(maybeHit.key, defineLang)
    toggleShowMore()
  }

  const onNavSearch = (name) => {
    if (name) {
      setSearchTerm(name)
      navigate(createSearchUrl(name))

      if (searchHistory[searchHistory.length - 1] !== name) {
        setSearchHistory([...searchHistory.filter((search) => search !== name), name])
        handleNavSearch(defineLang, name, [...searchHistory.filter((search) => search !== name), name])
      }
    }
  }

  const handleClearSearchItem = (e, index) => {
    e.stopPropagation()
    const newSearchHistory = searchHistory.filter((search, i) => i !== index)
    setSearchHistory(newSearchHistory)
    localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory))
  }

  const handleClearAllSearch = () => {
    setSearchHistory([])
    localStorage.removeItem('searchHistory')
  }

  const optionModalProps = {
    showModal: showMoreOptions,
    positionRef,
    parentRef: moreDivRef,
    toggleModal: toggleShowMore,
  }

  const modalAnimateProps = {
    animateProps: basicModal,
    isVisible: showMoreOptions,
    keyId: maybeHit?.key,
  }

  const extendModalProps = {
    copyLink: true,
    handleCopyLink: (e) => onCopyLink(e, maybeHit.title, maybeHit.key),
    goToSong: true,
    handleGoToSong: (e) => handleGoToSong(e, maybeHit.title, maybeHit.key),
    addToFav: true,
    handleAddToFav: (e) => handleAddToFav(e),
  }

  if (isLoading) return <Loading />

  return (
    <div className='smain-container'>
      {trendingKeywords.length !== 0 && (
        <div className='trend-keywords-container relative sm:pt-16 ip6:pt-14 sm:px-32px ip6:px-28px ip5:pt-12 ip5:px-24px'>
          <h1 className='tk-title common-title color-0-88'>{defineLang('Top từ khóa', 'Top Keyword')}</h1>
          <div className='tk-main'>
            {trendingKeywords.map((keyword) => {
              const { order, title } = keyword

              return (
                <div key={order} className='tk-content bg-color-0-05 color-0-5' onClick={() => onNavSearch(title)}>
                  <p className='tk-content-title color-0-5'>
                    <span className='tk-position'>#{order}</span>
                    {title}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {searchHistory.length === 0 || (
        <div className='search-history-container relative sm:pt-16 ip6:pt-14 sm:px-32px ip6:px-28px ip5:pt-12 ip5:px-24px'>
          <h1 className='search-history-title common-title color-0-88'>{defineLang('Lịch sử tìm kiếm', 'Search History')}</h1>
          <div className='sh-main-list'>
            {searchHistory.map((search, i) => (
              <div key={i} className='sh-item bg-color-0-02 hover-bg-color-0-05' onClick={() => onNavSearch(search)}>
                <p className='sh-search-term color-0-5'>{search}</p>
                <div className='sh-clear-item' onClick={(e) => handleClearSearchItem(e, i)}>
                  <FaRegTrashAlt />
                </div>
              </div>
            ))}
          </div>
          <p className='sh-clear-all color-0-5' onClick={handleClearAllSearch}>
            {defineLang('Xóa tất cả', 'Clear all')}
          </p>
        </div>
      )}
      {maybeHit && (
        <div className='maybe-hit-container'>
          <div className='maybe-hit-title ip6:pt-14 sm:px-32px ip6:px-28px ip5:pt-12 ip5:px-24px'>
            <div className='maybe-hit-lead common-title color-0-88'>{defineLang('Có thể hot', 'Maybe Hit')}</div>
          </div>
          <div className='maybe-hit-wrapper bg-color-0-02  sm:pb-18px ip5:py-12px sm:px-32px ip5:px-24px'>
            <div className='maybe-hit-main sm:h-160px ip5:h-120px ip6:h-140px'>
              <div className='maybe-hit-thumb sm:h-160px ip5:h-120px ip6:h-140px'>
                <div className='speacial-tag fz-10px'>{defineLang('Đặc biệt', 'Special')}</div>
                <div className='maybe-hit-img-wrapper sm:h-160px ip6:h-140px sm:w-160px ip5:h-120px ip5:w-120px ip6:w-140px '>
                  <div className='maybe-hit-img-main sm:h-160px ip5:w-120px ip6:h-140px sm:w-160px ip5:h-120px ip5: ip6:w-140px'>
                    <img src={maybeHit.thumbnail} alt={maybeHit.title} title={maybeHit.title} />
                    <OptionModal {...optionModalProps}>
                      <ModalAnimate {...modalAnimateProps}>
                        <ExtendModal {...extendModalProps} />
                      </ModalAnimate>
                    </OptionModal>
                    <div className='maybe-hit-img-overlay' ref={positionRef} onClick={() => handlePlayNewSong(maybeHit.key, dispatch, actions, curPlaylist, true, defineLang)}>
                      <div className='maybe-hit-icon'>
                        <BsPlayCircleFill />
                      </div>
                      <div className='maybe-hit-more-options' ref={moreDivRef} onClick={(e) => handleMoreOptions(e)}>
                        <IoMdMore />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='maybe-hit-description sm:ml-14 md:ml-16 ip6:ml-18px ip5:ml-8px sm:max-w-[calc(100%_-_16rem)] ip6:max-w-[calc(100%_-_14rem)] ip5:max-w-[calc(100%_-_14rem)]'>
                <div className='maybe-hit-desc-title fz-14px color-0-88'>
                  <span className='color-0-5 fz-13px'>{defineLang('Bài hát: ', 'Song: ')}</span>
                  <Link to={createSongUrl(maybeHit.title, maybeHit.key)}>{maybeHit.title}</Link>
                </div>
                <CircleTitleArtist circleStyles='float-left' titleStyles='!mt-unset ml-8px' artists={maybeHit.artists} />
                <div className='maybe-hit-date-release fz-14px color-0-5'>
                  <GoCalendar />
                  <span>
                    {defineLang('Ngày phát hành', 'Released date')}: {covertTimestamp(maybeHit.dateRelease)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchMain

// <div className='om-main color-0-88 bg-color-1'>
//                           <ul>
//                             <li>
//                               <SiYoutubemusic />
//                               <span>{defineLang('Thêm vào chờ phát', 'Add to queue')}</span>
//                             </li>
//                             <li onClick={(e) => onCopyClick(e, maybeHit.title, maybeHit.key)}>
//                               <BsLink45Deg />
//                               <span>{defineLang('Sao chép link', 'Copy link')}</span>
//                             </li>
//                             <li onClick={() => navigate(createSongUrl(maybeHit.title, maybeHit.key))}>
//                               <BsMusicNote />
//                               <span>{defineLang('Đi đến bài hát', 'Go to song')}</span>
//                             </li>
//                           </ul>
//                         </div>
