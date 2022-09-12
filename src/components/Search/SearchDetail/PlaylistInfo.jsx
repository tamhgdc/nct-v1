import { CommonPlaylist } from 'components'
import { Grid } from '@mui/material'

const PlaylistInfo = ({ playlists = [], defineLang }) => playlists.length === 0 || (
  <div className='playlist-info-container common-section'>
    <div className='pi-title pt0-lr3-2 common-title color-0-88'>{defineLang('Danh sách phát', 'Playlist')}</div>
    <div className='pi-main common-main'>
      <Grid className='list-playlists' container spacing={{ xs: 1, sm: 2 }}>
        {playlists.map((playlist) => (
          <Grid key={playlist.key} item xs={6} sm={4} md={4} lg={3} xl={2}>
            <CommonPlaylist {...playlist} keyId={playlist.key} />
          </Grid>
        ))}
      </Grid>
    </div>
  </div>
)

export default PlaylistInfo
