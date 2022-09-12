import React from 'react'
import { Link } from 'react-router-dom'

import './ShowcaseSlider.scss'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'

import { settings } from 'services/ShowcaseSlider'
import { getNavigateUrl } from 'share/utilities'

const ShowcaseSlider = ({ showcase = [] }) => {

	return (
		<div className='sc-container'>
			<Slider {...settings}>
				{showcase?.map((sc) => {
					return (
						<Link to={getNavigateUrl(sc.url)} key={sc.key} title={sc.title} className='sc-img-container'>
							<img className='sc-img-slider sm:h-[316.8px] ip5:h-200px xl:h-[calc(calc(100vw_-_60rem)_*_2_/_5_+_3.8rem)]' src={sc.imageUrl} alt={sc.title} />
						</Link>
					)
				})}
			</Slider>
		</div>
	)
}

export default ShowcaseSlider
