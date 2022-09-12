import React from 'react'
import { Link } from 'react-router-dom'
import './HotTopic.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperSlider from './SwiperSlider'
import 'swiper/scss'
import {
	SlidePrevButton,
	SlideNextButton,
} from 'components/CustomNav/CustomNav'

import { useStore } from 'store'

const HotTopic = ({ hotTopic }) => {
  const [state] = useStore()
  const { lang } = state

	const swiperProps = {
		slidesPerView: 4,
		spaceBetween: 8,
		breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 4
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 6
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 8
    },
    1536: {
      slidesPerView: 6,
      spaceBetween: 10
    }
		}
	}

	return (
		<div className='ht-container'>
			<div className='ht-title'>
				<Link to='/chu-de'>{lang === 'vi' ? 'Chủ đề hot' : 'Hot topic'}</Link>
			</div>
			<div className='ht-main'>
				<Swiper {...swiperProps}>
					<div className='ht-nav color-0-5'>
						<SlidePrevButton />
						<SlideNextButton />
					</div>
					{hotTopic.map((topic) => {
						const { key, thumbURL, title } = topic
            
						return (
							<SwiperSlide key={key}>
								<SwiperSlider
									keyId={key}
									thumbURL={thumbURL}
									title={title}
								/>
							</SwiperSlide>
						)
					})}
				</Swiper>
			</div>
		</div>
	)
}

export default HotTopic
