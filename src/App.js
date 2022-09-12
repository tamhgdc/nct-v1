import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'

import { Explore, Homepage, NotFound, Search, User, Favorite, SongPage, Playlist, Video, Artist, Topic } from 'pages'
import { MainHomepage, SongPlaylistVideo, ArtistMain, TopicMain, Collection, Top100Main, Top100Item, Chart, Realtime, Top20, UserMain, SongPageDetail, PlaylistDetail, VideoDetail, ArtistDetail, TopicDetail, History } from 'components'

import { useStore, actions } from 'store'
import { auth } from 'config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const App = () => {
  const [state, dispatch] = useStore()

  useEffect(() => {
    // Theme
    const localTheme = localStorage.getItem('theme')
    if (localTheme) {
      dispatch(actions.setTheme(localTheme))
    } else {
      localStorage.setItem('theme', 'light')
    }

    // Language
    const localLanguage = localStorage.getItem('lang')
    if (localLanguage) {
      dispatch(actions.setLang(localLanguage))
    } else {
      localStorage.setItem('lang', 'vi')
    }

    // Get last played song
    const playingSongId = localStorage.getItem('playingSongId')
    if (playingSongId) {
      dispatch(actions.setPlayingSongId(playingSongId))
    }
  }, [])

  useEffect(() => {
    if (state.theme) {
      document.body.setAttribute('data-theme', state.theme)
    }
  }, [state.theme])

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(actions.onSignedIn())
      } else {
        dispatch(actions.onSignedOut())
      }
    })
  }, [auth.currentUser])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />}>
          <Route index element={<MainHomepage />} />
          <Route path='user' element={<User />}>
            <Route index element={<UserMain />} />
            <Route path='yeu-thich' element={<Favorite />} />
            <Route path='history' element={<History />} />
          </Route>
          <Route path='kham-pha' element={<Explore />} />
          <Route path='tim-kiem' element={<Search />} />
          <Route path='bai-hat' element={<SongPage />}>
            <Route index element={<SongPlaylistVideo type='song' />} />
            <Route path=':songKey' element={<SongPageDetail />} />
          </Route>
          <Route path='playlist' element={<Playlist />}>
            <Route index element={<SongPlaylistVideo type='playlist' />} />
            <Route path='tags' element={<Collection />} />
            <Route path=':playlistId' element={<PlaylistDetail />} />
          </Route>
          <Route path='video' element={<Video />}>
            <Route index element={<SongPlaylistVideo type='mv' />} />
          </Route>
          <Route path='nghe-si' element={<Artist />}>
            <Route index element={<ArtistMain />} />
            <Route path=':artistName' element={<ArtistDetail />} />
          </Route>
          <Route path='chu-de' element={<Topic />}>
            <Route index element={<TopicMain />} />
            <Route path=':topicId' element={<TopicDetail />} />
          </Route>
          <Route path='top-100' element={<Top100Main />}>
            <Route path=':top100Id' element={<Top100Item />} />
          </Route>
          <Route path='bang-xep-hang' element={<Chart />}>
            <Route path='realtime' element={<Realtime />} />
            <Route path=':top20Id' element={<Top20 />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/video'>
          <Route path=':videoId' element={<VideoDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
