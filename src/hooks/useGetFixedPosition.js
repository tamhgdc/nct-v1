import { useLayoutEffect } from 'react'

const useGetFixedPosition = (ref, handle, showModal) => {
  useLayoutEffect(() => {
    if (ref) {
			const position = ref.current?.getBoundingClientRect()
			const top = ref.current?.offsetTop
      handle(position?.right, top)
    }
  }, [showModal, ref])
}

export default useGetFixedPosition
