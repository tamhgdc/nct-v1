import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useTitle = (title) => {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = title
  }, [title, pathname])
}

export default useTitle
