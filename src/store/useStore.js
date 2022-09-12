import { useContext } from 'react'
import { StoreContext } from 'store'

const useStore = () => {
  const [state, dispatch] = useContext(StoreContext)

  return [state, dispatch]
}

export default useStore
