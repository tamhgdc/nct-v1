import Grid from '@mui/material/Grid'
import { CommonVideo } from 'components'
import { Link } from 'react-router-dom'
import { getSlideVideos } from 'share/utilities'

const NewVideo = ({ videos = [] }) => (
  <div className='nv-container'>
    <div className='mt-16 ml-32px main-title'>
      <Link to='/video'>Hot video</Link>
    </div>
    <div className='mt-16px ip5:mx-32px xl:mx-16'>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {getSlideVideos(videos, 'big').map((video) => (
          <Grid key={video.key} item xs={6} sm={6} md={6} lg={6} xl={4}>
            <CommonVideo {...video} keyId={video.key} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={{ xs: 1, sm: 2 }} className='xs:mt-4'>
        {getSlideVideos(videos, 'small').map((video) => (
          <Grid key={video.key} item xs={6} sm={6} md={3} lg={3} xl={2}>
            <CommonVideo {...video} keyId={video.key} />
          </Grid>
        ))}
      </Grid>
    </div>
  </div>
)

export default NewVideo
