import { SearchContent, Title } from 'components'
import { useLang } from 'hooks'

const Search = () => (
  <div className='search-page'>
    <Title title={useLang('Tìm kiếm  bài hát - Playlist - MV', 'Search for song - Playlist - MV')} />
    <SearchContent />
  </div>
)

export default Search
