import React from 'react'
import { useNavigate } from 'react-router-dom'
import './TopicEvent.scss'

import SwiperSlider from './SwiperSlider'

import { removeDuplicate } from 'share'
import { createPlaylistUrl } from 'share/utilities'
import { getTopicEventTitle } from 'services/TopicEvent'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import { SlidePrevButton, SlideNextButton } from 'components/CustomNav/CustomNav'

import { useStore } from 'store'

const TopicEvent = ({ topicEvent = [] }) => {
  const [state] = useStore()
  const { lang, favPlaylists } = state
	const navigate = useNavigate()

	const onNavigatePlaylist = (title, keyId) => {
		navigate(createPlaylistUrl(title, keyId))
	}

	const swiperProps = {
		slidesPerView: 4,
		spaceBetween: 10,
		breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 6
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 8
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 10
    },
    1536: {
      slidesPerView: 6,
      spaceBetween: 12
    }
		}
	}

	return (
		<div className='te-container'>
			{topicEvent.map((topic) => {
				const { vieTitle, enTitle } = getTopicEventTitle(topic.groupName)
				const listPlaylist = removeDuplicate(topic.listPlaylist, 'key')

				return (
					<div key={vieTitle} className='tp-container'>
						<div className='tp-header'>
							<div className='tp-title mt-32px'>{lang === 'vi' ? vieTitle : enTitle}</div>
						</div>
						<div className='tp-main'>
							<Swiper { ... swiperProps }>
								<div className='tp-nav color-0-5'>
									<SlidePrevButton />
									<SlideNextButton />
								</div>
								{listPlaylist.map((playlist) => {
									const { key, thumbnail, title } = playlist

									return (
										<SwiperSlide key={key}>
											<SwiperSlider
												keyId={key}
												thumbnail={thumbnail}
												title={title}
												onNavigatePlaylist={onNavigatePlaylist}
												lang={lang}
												favPlaylists={favPlaylists}
											/>
										</SwiperSlide>
									)
								})}
							</Swiper>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default TopicEvent
