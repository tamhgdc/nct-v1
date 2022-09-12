import notfoundImg from 'images/not_found.png'
import './NotFound.scss'

import { useLang } from 'hooks'
import { Title } from 'components'

const NotFound = ({ vie = 'Không có sẵn dữ liệu để hiển thị', eng = 'No data available here' }) => {
  return (
    <div className='notfound-container commonMainOutlet flexCenter'>
      <Title title={useLang('Không có dữ liệu', 'No data available')} />
      <img src={notfoundImg} alt='Page not found' />
      <p className='notfound-title color-0-5'>{useLang(vie, eng)}</p>
    </div>
  )
}

export default NotFound
