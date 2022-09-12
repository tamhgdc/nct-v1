import React from 'react'
import parse from 'html-react-parser'
import { Title } from 'components'

const ArtistIntro = ({ defineLang, artist = {} }) => {
  const { birthday = '', description = '', gender = '', name = '', nation = '' } = artist

  return (
    <div className='mt-16 mx-32px text-sm color-0-5'>
    <Title title={name ? `${name} | ${defineLang(`Tiểu sử ca sĩ ${name}`, `Singer ${name}'s biography`)} - NhacCuaTui Clone` : 'NhacCuaTui Clone'} />
      <div>
        <div className='text-22px font-bold color-0-88 mb-16px'>{defineLang('Thông tin', 'Information')}</div>
        {birthday && (
          <div>
            {defineLang('Sinh nhật', 'Birthday')}: {birthday}
          </div>
        )}
        {gender && (
          <div>
            {defineLang('Giới tính', 'Gender')}: {gender}
          </div>
        )}
        {nation && (
          <div>
            {defineLang('Quốc tịch', 'Nationality')}: {nation}
          </div>
        )}
      </div>
      {description && (
        <div className='mt-24px'>
          <div className='text-22px font-bold color-0-88 mb-16px'>{defineLang('Tiểu sử', 'Story')}</div>
          <div>
            {parse(description)}
          </div>
        </div>
      )}
    </div>
  )
}

export default ArtistIntro
