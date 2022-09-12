export const volumnSlider = {
  className: '!w-12px !h-[7.2rem] !mx-auto !rounded-2px !px-4',
  vertical: true,
  defaultValue: 100,
  handleStyle: {
    width: '0.8rem',
    height: '0.8rem',
    left: '1.1rem',
    backgroundColor: '#fafafa',
    border: '0.1rem solid #2daaed'
  },
  trackStyle: {
    width: '0.2rem',
    left: '0.9rem',
    backgroundImage: 'linear-gradient(0deg,#2f80ed 0%,#00aeef 100%)',
  },
  railStyle: {
    width: '0.2rem',
    backgroundColor: 'rgba(244,246,248,0.05)',
  },
}

export const timeSlider = {
  className: '!w-184px !h-14px',
  trackStyle: {
    height: '0.2rem',
    borderRadius: '1rem',
    background: 'linear-gradient( to right, rgba(47,128,237,1) 0%, rgba(0,174,239,1) 100% ) no-repeat',
  },
  handleStyle: {
    cursor: 'pointer',
    width: '1.4rem',
    height: '1.4rem',
    backgroundColor: '#fafafa',
    opacity: 1,
    border: '0.1rem solid #2daaed',
  },
}

export const handleRenderSpeakerIcon = (volumn) => {
  if (volumn > 50) {
    return 'high'
  } else if (volumn > 0) {
    return 'low'
  } else {
    return 'xmark'
  }
}