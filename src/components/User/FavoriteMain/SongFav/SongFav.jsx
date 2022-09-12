import React, { useState, useEffect } from 'react'
import './SongFav.scss'

import initImage from 'images/default/default_personal_playlist.png'
import initUser from 'images/default/default_user.jpg'

import { ShadowThumb, SongList, SquareImg } from 'components'
import { getUserSongs } from 'services/User/User'
import { getSongsView, getListSongsKey } from 'share/utilities'
import { getUserDetail, handleClearAllFav } from 'services/firebase/firestore'

const SongFav = ({ defineLang, currentUser = {} }) => {
  const [favSongs, setFavSongs] = useState([])
  console.log('favSongs: ', favSongs)
  const [songsView, setSongView] = useState({})
  
  const onHandleClearAllFav = async () => {
    await handleClearAllFav('songs', defineLang)
    setFavSongs([])
  }

  useEffect(() => {
    const getFavSongsData = async () => {
      const { favorite } = await getUserDetail()
      if (favorite.songs) {
        const data = await getUserSongs(favorite.songs)

        setFavSongs(data)
      }
    }

    getFavSongsData()
  }, [])

  useEffect(() => {
    try {
      if (favSongs.length !== 0) {
        const getSongsViewState = async (favSongsKey) => {
          const songsView = await getSongsView(favSongsKey)
          setSongView(songsView)
        }

        getSongsViewState(getListSongsKey(favSongs))
      }
    } catch (error) {
      throw new Error(error)
    }
  }, [favSongs])

  if (!currentUser) return null

  const { displayName = '', photoURL = '' } = currentUser

  const songListProps = { defineLang, listSong: favSongs.slice().reverse(), removeFav: true, songsView, setFavSongs }

  return (
    <div className='song-fav-container'>
      <div className='sf-header mt-16px w3-row'>
        <div className='sf-thumb-img sm:w-160px ip5:w-120px ip6:w-140px w3-col sm:ml-24px ip5:ml-16px ip6:ml-18px'>
          <ShadowThumb styles='sm:w-160px ip5:w-120px ip6:140px' shadowHeight='0.6rem' imageUrl={initImage} />
        </div>
        <div className='sf-info sm:pl-24px ip5:pl-12px w3-rest'>
          <div className='common-sub-title color-0-5'>
            Playlist:
            <span className='color-0-88'>{defineLang('Bài hát yêu thích', 'Favorite songs')}</span>
          </div>
          <div className='sf-total-number w3-row'>
            <div className='width-fit-content color-0-5'>{defineLang(`${favSongs?.length || 0} bài hát`, `${favSongs?.length || 0} songs`)}</div>
          </div>
          <div className='bottom-position'>
            <div className='sf-author sm:mt-24px ip5:mt-8px w3-row bg-color-0-02'>
              <div className='sf-author-main my-12px sm:mx-24px ip5:mx-12px w3-rest w3-row'>
                <div className='sf-author-img border-0-05 w3-col'>
                  <SquareImg imageUrl={photoURL || initUser} title={displayName} />
                </div>
                <div className='sf-author-desc w3-col'>
                  <div className='small-common color-0-5'>{defineLang('Được tạo bởi:', 'Created by:')}</div>
                  <div className='sf-author-name'>{displayName}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='sf-main'>
        <div className='song-list common-title color-0-88 alcenter-jcbetween'>
          <div className='sf-title-content'>{defineLang('Danh sách bài hát', 'Song list')}</div>
          {favSongs.length !== 0 && (
            <div className='clear-all-song clickable small-common color-0-5' onClick={onHandleClearAllFav}>
              {defineLang('Xóa tất cả', 'Clear all')}
            </div>
          )}
        </div>
        <SongList {...songListProps} />
      </div>
    </div>
  )
}

export default SongFav
