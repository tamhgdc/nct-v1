import { Helmet } from 'react-helmet-async'

const ShareImage = ({ imageUrl }) => {
  return (
    <Helmet>
      <link rel='image_src' href={imageUrl} />
      <meta property='og:image' content={imageUrl} />
      <meta name='thumbnail' content={imageUrl} data-react-helmet='true' />
    </Helmet>
  )
}

export default ShareImage
