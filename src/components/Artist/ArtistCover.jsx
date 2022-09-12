import React from 'react'
import no_artist_img from 'images/default/default_artist.png'

import Image from './../Common/Image'

const ArtistCover = ({ coverImageURL = '', imageUrl = '', name = '' }) => coverImageURL && (
  <div className='relative w-full h-[27.5rem] mx-auto bg-no-repeat bg-cover bg-center' style={{ backgroundImage: `url(${coverImageURL})` }}>
    <div className='absolute bottom-4 left-6 rounded-25px bg-black/50 flex items-center'>
      <Image className='w-20 h-20 rounded-circle' imageUrl={imageUrl} backupImg={no_artist_img} />
      <p className='text-sm font-medium text-slate-100 p-4 pr-8'>{name}</p>
    </div>
  </div>
)

export default ArtistCover
