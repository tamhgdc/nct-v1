import React, { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import './OptionModal.scss'

import { useGetPosition, useOnClickOutside } from 'hooks'

const OptionModal = ({ showModal, positionRef, parentRef, children, toggleModal, styles = {} }) => {
  const modalRef = useRef(null)
  const [position, setPosition] = useState({})

  useGetPosition(
    positionRef,
    (right, top) =>
      setPosition({
        top: top,
        left: right,
      }),
    showModal
  )

  useOnClickOutside(modalRef, parentRef, toggleModal)

  if (!showModal) return null

  return (
    position &&
    createPortal(
      <div ref={modalRef} className='om-container' style={{ ...position, ...styles }} initial={{ opacity: 0.5, scale: 0.5 }}>
        {children}
      </div>,
      document.body
    )
  )
}

export default OptionModal
