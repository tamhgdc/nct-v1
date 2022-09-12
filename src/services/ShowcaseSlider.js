import {
	CustomPrevArrow,
	CustomNextArrow,
} from 'components/ShowcaseSlider/CustomArrow/CustomArrow'
import CustomDots from 'components/ShowcaseSlider/CustomDots/CustomDots'

export const settings = {
	dots: true,
	className: 'center',
	infinite: true,
	slidesToShow: 1,
	autoplay: true,
	speed: 800,
	lazyLoad: true,
	pauseOnHover: true,
	swipeToSlide: true,
	draggable: false,
	nextArrow: <CustomNextArrow />,
	prevArrow: <CustomPrevArrow />,
	customPaging: (i) => (
		<div>
			<CustomDots />
		</div>
	),
}
