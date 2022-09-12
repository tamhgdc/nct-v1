import React from 'react'
import './SearchDetail.scss'

import { PlaylistInfo, SongInfo, VideoInfo } from 'components'

const SearchDetail = ({ playlist, song, video, defineLang }) => {
  
  return (
    <div className='song-detail-container'>
      {song && <SongInfo songs={song.song} defineLang={defineLang} />}
      {playlist && <PlaylistInfo playlists={playlist.playlist} defineLang={defineLang} />}
      {video && <VideoInfo videos={video.video} defineLang={defineLang} />}
    </div>
  )
}

export default SearchDetail
