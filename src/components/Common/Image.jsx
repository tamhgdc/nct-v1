import React, { useEffect, useRef } from 'react'

const Image = ({ imageUrl, backupImg, loadingImg, ... props }) => {
  const imageRef = useRef(null)

  const handleErrorImg = ({ currentTarget }) => {
    currentTarget.onerror = null
    currentTarget.src = backupImg
  }

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.setAttribute('src', imageUrl)
        }
      }, {
        rootMargin: '100px'
      })

      observer.observe(imageRef.current)
    } else {
      imageRef.current.setAttribute('src', imageUrl)
    }
  }, [imageUrl])

  return (
    <img ref={imageRef} src={backupImg} onError={handleErrorImg} { ... props } />
  )
}

export default Image