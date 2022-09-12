import Blur from 'react-blur'

const BlurImg = ({ img, blurRadius, className }) => {
  const blurProps = {
    img,
    blurRadius,
    className,
  }

  return (
    <Blur {...blurProps}>
      <div className='absolute top-0 left-0 h-full w-full bg-black/70'></div>
    </Blur>
  )
}

export default BlurImg
