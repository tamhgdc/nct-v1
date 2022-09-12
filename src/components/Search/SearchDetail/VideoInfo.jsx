import { CommonVideo } from 'components'
import { Grid } from '@mui/material'

const VideoInfo = ({ videos = [] }) =>  videos.length === 0 || (
  <div className='video-info-container common-section'>
    <div className='video-info-title pt0-lr3-2 common-title color-0-88'>Video</div>
    <div className="video-info-main common-main">
      <Grid className='list-videos' container spacing={{ xs: 1, sm: 2 }}>
        {videos.map(video => (
          <Grid item key={video.key} xs={6} sm={4} md={3} lg={3} xl={3}>
            <CommonVideo { ... video } keyId={video.key} />
          </Grid>
        ))}
      </Grid>
    </div>
  </div>
)

export default VideoInfo