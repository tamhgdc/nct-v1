import React, { useCallback } from 'react'

const TitleCommon = ({ type, defineLang, title, styles = '', typeStyles = '', titleStyles = '' }) => {
  const defineType = useCallback(() => {
    switch (type) {
      case 'song':
        return defineLang('Bài hát: ', 'Song: ')
      case 'playlist':
        return defineLang('Danh sách phát: ', 'Playlist: ')
      case 'video':
        return 'Video: '
      default:
        break
    }
  }, [type, defineLang])

  return (
    <div className={`leading-24px ${styles}`}>
      <span className={`color-0-5 font-semibold text-sm w-fit ${typeStyles}`}>{defineType(type)}</span>
      <span className={`color-0-88 font-bold text-base ${titleStyles}`}>{title}</span>
    </div>
  )
}

export default TitleCommon
