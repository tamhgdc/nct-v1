import { useEffect } from 'react'

const useSlider = (setIndex, array, time = 3000) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((oldIndex) => {
        if (oldIndex === (array.length - 1)) {
          return 0
        } else {
          return oldIndex + 1 
        }
      });
    }, time)

    return () => clearInterval(interval)
  })
}

export default useSlider