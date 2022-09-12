import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'

import { useStore } from 'store'
import { CircleTitleArtist, SongList, ListTag, LoadingV2, Provider, ShadowThumb, Sharing, Title, TitleCommon, MaybeLike, Footer } from 'components'
import { createTitleArtist, getCurrentPathname, getListSongsKey, getMaybeLike, getSongsView, handleCopyProxy } from 'share/utilities'
import { getPlaylistDetailData } from 'services/Playlist/Playlist'
import { IconButton, Tooltip } from '@mui/material'
import { BsBookmarkPlus } from 'react-icons/bs'
import { toastNotify } from 'share/toast'
import { handleAddToFavPlaylist } from 'share/addToFav'
import { addPlaylistHistory } from 'services/firebase/firestore'

const PlaylistDetail = () => {
  const [state] = useStore()
  const defineLang = useCallback((vie, eng) => (state.lang === 'vi' ? vie : eng), [state.lang])

  const params = useParams()
  const query = new URLSearchParams(params.playlistId)

  const [playlistDetail, setPlaylistDetail] = useState({})
  const [maybeLike, setMaybeLike] = useState(null)
  const [songsView, setSongView] = useState({})

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    try {
      setIsLoading(true)
      const getPlaylistDetailState = async () => {
        const playlistDetail = await getPlaylistDetailData(query.get('k'))
        const maybeLike = await getMaybeLike(playlistDetail.key, 'playlist')

        const getSongsViewState = async (favSongsKey) => {
          const songsView = await getSongsView(favSongsKey)
          setSongView(songsView)
        }

        getSongsViewState(getListSongsKey(playlistDetail.songs))

        setPlaylistDetail(playlistDetail)
        setMaybeLike(maybeLike)
        setIsLoading(false)
      }

      getPlaylistDetailState()
      addPlaylistHistory(query.get('k'))
    } catch (error) {
      setIsLoading(false)
      throw new Error(error)
    }
  }, [params.playlistKey, query.get('k')])

  if (isLoading)
    return (
      <div className='commonMainOutlet flexCenter h-full'>
        <LoadingV2 />
      </div>
    )

  const handleCopyShare = () => {
    handleCopyProxy(defineLang, getCurrentPathname())
  }

  const onShareWindowClose = () => {
    toastNotify(defineLang('Chia sẻ lên facebook thành công', 'Share to facebook successfully'), 'success')
  }

  const { key = '', thumbnail, artists = [], title, dateCreate, description = '', listTag = [], uploadBy = {}, songs = [] } = playlistDetail

  const sharingProps = { defineLang, placement: 'top', handleCopyShare, onShareWindowClose, shareLink: getCurrentPathname(), shareClass: 'ml-8px' }

  const providerProps = {
    provider: uploadBy || {},
    defineLang,
    avatarUrl: uploadBy.avatarUrl,
    fullName: uploadBy.fullName,
  }

  return (
    <div className='commonMainOutlet'>
      <div className='pt-24px px-32px relative margin-footer'>
        {artists.length !== 0 && <Title title={createTitleArtist(title, artists)} />}
        <div className='w3-row'>
          <div className='w3-col w-240px'>
            <ShadowThumb imageUrl={thumbnail} styles='sm:w-240px ip5:w-180px ip6:220px' />
          </div>
          <div className='w3-rest pl-24px'>
            <TitleCommon type='playlist' defineLang={defineLang} title={title} />
            <CircleTitleArtist circleStyles='float-left' titleStyles='!mt-unset ml-8px' artists={artists} />
            <div className='w3-row mt-4'>
              <div className='w3-rest text-13px color-0-5 w-fit'>{new Date(dateCreate).toLocaleDateString()}</div>
            </div>
            <div className='mt-8px text-sm color-0-5'>{parse(description)}</div>
            <ListTag listTag={listTag} defineLang={defineLang} />
          </div>
        </div>
        <div className='w-full h-64px rounded-4px bg-color-0-02 mt-24px px-24px py-12px flex justify-between'>
          <Provider {...providerProps} />
          <div className='flex items-center'>
            <Tooltip title={defineLang('Thêm vào yêu thích', 'Add to favorite')} placement='top' arrow enterDelay={400}>
              <IconButton size='large' onClick={() => handleAddToFavPlaylist(key, defineLang)}>
                <BsBookmarkPlus />
              </IconButton>
            </Tooltip>
            <Sharing {...sharingProps} />
          </div>
        </div>
        <div className='mt-44px mb-16px text-22px font-bold color-0-88'>{defineLang('Danh sách bài hát', 'Song list')}</div>
        <SongList listSong={songs} defineLang={defineLang} addToFav songsView={songsView} />
        <MaybeLike defineLang={defineLang} maybeLike={maybeLike} />
      </div>
      <Footer />
    </div>
  )
}

export default PlaylistDetail
