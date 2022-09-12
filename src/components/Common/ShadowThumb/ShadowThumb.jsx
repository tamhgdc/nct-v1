import './ShadowThumb.scss'

const ShadowThumb = ({ shadowHeight = '0.6rem', imageUrl, styles = '' }) => {
  return (
    <div className='st-container'>
      <div className='shadow1 bg-color-0-05' style={{ height: shadowHeight }}></div>
      <div className='shadow2 bg-color-0-1' style={{ height: shadowHeight }}></div>
      <div className={`st-image ${styles}`} style={{ backgroundImage: `url(${imageUrl})` }}></div>
    </div>
  )
}

export default ShadowThumb
