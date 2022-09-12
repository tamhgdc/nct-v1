import { Autoplay, EffectFade } from 'swiper';

export const topicSwiperProps = {
  className: 'topic-swiper-container',
  modules: [EffectFade, Autoplay],
  centeredSlides: true,
  effect: 'fade',
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pauseOnMouseEnter: true,
  loop: true,
}
