import { Autoplay } from 'swiper'

export const trendArtSwiperProps = {
  direction: 'vertical',
  className: 'ta-swiper-container',
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pauseOnMouseEnter: true,
  modules: [Autoplay],
  loop: true,
}

export const createSearchUrl = (query) => {
  if (query) {
    return `/tim-kiem?q=${query.trim()}`
  } else {
    return '/'
  }
}