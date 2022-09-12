import React, { useState, useEffect } from 'react'
import { Loading, SearchDetail, TopResult, SongResult, PlaylistSearch, VideoSearch, Navbar } from 'components'
import { NotFound } from 'pages'
import notfoundImg from 'images/not_found.png'

import { getSearchResult, searchResultNavbar } from 'services/Search/SearchResult'
import { isEmptyObject } from 'share'

const SearchResult = ({ searchQuery, searchTerm, defineLang, isLoading, setIsLoading, favPlaylists }) => {
  const [searchResult, setSearchResult] = useState(null)
  const [currentCate, setCurrentCate] = useState('all')
  
  const handleCateChange = (value) => {
    setCurrentCate(value)
  }

  useEffect(() => {
    const getSearchResultState = async () => {
      try {
        setIsLoading(true)
        const searchResult = await getSearchResult(searchQuery)

        setSearchResult(searchResult)
        setIsLoading(false)
      } catch (error) {
        throw new Error(error)
      }
    }

    getSearchResultState()
  }, [searchQuery])

  if (isLoading) return <Loading />

  if (searchResult) searchResult.status === 'error' && <NotFound />

  const commonProps = {
    searchQuery,
    searchTerm,
    defineLang,
  }

  const navbarProps = {
    defineLang, curCate: currentCate, handleCateChange, categories: searchResultNavbar
  }

  if (searchResult) {
    const { recommend = {}, search = {} } = searchResult
    
    return (
      <div className='search-result-container'>
        <Navbar { ... navbarProps } />
        <div className='sr-main'>
          {isEmptyObject(recommend) && search.song?.song?.length !== 0 && search.playlist?.playlist?.length !== 0  && search.video?.video?.length !== 0 ? (
            <div className='search-not-found'>
              <img src={notfoundImg} alt='Page not found' />
              <p className='notfound-title color-0-6'>{defineLang(`Không có kết quả nào cho ${searchTerm || searchQuery}. Hãy kiểm tra lại chính tả của từ khoá`, `No results for ${searchTerm || searchQuery}. Please check the spelling of keyword`)}</p>
            </div>
          ) : (
            <React.Fragment>
              {currentCate === 'all' && (
                <React.Fragment>
                  {isEmptyObject(recommend) || <TopResult {...recommend} defineLang={defineLang} favPlaylists={favPlaylists} />}
                  {isEmptyObject(search) || <SearchDetail {...search} defineLang={defineLang} />}
                </React.Fragment>
              )}
              {currentCate === 'song' && <SongResult {...commonProps} />}
              {currentCate === 'playlist' && <PlaylistSearch {...commonProps} />}
              {currentCate === 'video' && <VideoSearch {...commonProps} />}
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }
}

export default SearchResult
