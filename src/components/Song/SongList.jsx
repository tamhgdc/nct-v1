import React from 'react'
import './SongList.scss'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { SongItem } from 'components'
import { getValidArr } from 'share/utilities'

const SongList = ({ defineLang, listSong = [], removeFav, addToFav, songsView, setFavSongs, removeHistory, setHistorySongs }) => {
  const [animationParent] = useAutoAnimate()

  const songItemProps = {
    songsView,
    setFavSongs,
    defineLang,
    removeFav,
    addToFav,
    removeHistory,
    setHistorySongs
  }

  return (
    <div className='mt-16px'>
      <ul ref={animationParent}>
        <li className='song-list-common song-list-header bg-color-0-02'>
          <div className='song-list-title-artist'>
            <div className='song-list-title song-list-title-header color-0-88'>{defineLang('Tiêu đề', 'Title')}</div>
            <div className='song-list-title song-list-artist-header color-0-88'>{defineLang('Nghệ sỹ', 'Artist')}</div>
          </div>
          <div className='song-list-title listen-title'>{defineLang('Lượt nghe', 'Listens')}</div>
          <div className='song-list-title duration-title'>{defineLang('Thời gian', 'Duration')}</div>
        </li>
        {getValidArr(listSong).map((song) => song.key && <SongItem {...song} {...songItemProps} key={song.key} keyId={song.key} />)}
      </ul>
    </div>
  )
}

export default SongList
