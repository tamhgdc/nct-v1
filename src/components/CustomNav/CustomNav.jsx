import React, { useState } from 'react'
import { useSwiper } from 'swiper/react'
import './CustomNav.scss'

import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

export const SlideNextButton = () => {
	const swiper = useSwiper({navigation: {
    nextEl: 'cusArrow nextArr',
  }})
	const [isReachEnd, setIsReachEnd] = useState(false)

	const isEnding = () => {
		if (swiper.isEnd) {
			setIsReachEnd(true)
		} else {
			setIsReachEnd(false)
		}
	}

	swiper.on('slideChange', isEnding)

	return (
		<div className={`cusArrow nextArr ${(swiper.slides.length === 1 || isReachEnd) ? 'disabled' : ''}`} onClick={() => swiper.slideNext()}>
			<IoIosArrowForward />
		</div>
	)
}

export const SlidePrevButton = () => {
	const swiper = useSwiper({navigation: {
    prevEl: 'cusArrow prevArr',
  }})
	const [isReachBeginning, setIsReachBeginning] = useState(true)

	swiper.on('slideChange', () => {
		if (swiper.isBeginning) {
			setIsReachBeginning(true)
		} else {
			setIsReachBeginning(false)
		}
	})

	return (
		<div className={`cusArrow prevArr ${isReachBeginning ? 'disabled' : ''}`} onClick={() => swiper.slidePrev()}>
			<IoIosArrowBack />
		</div>
	)
}
