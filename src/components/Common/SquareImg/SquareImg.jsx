import './SquareImg.scss'

const SquareImg = ({ imageUrl, title = '' }) => {


  return (
    <div className="square-img-container" style={{ backgroundImage: `url(${imageUrl})` }} title={title}>
    </div>
  )
}

export default SquareImg