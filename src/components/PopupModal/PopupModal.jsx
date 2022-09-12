import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import './PopupModal.scss'

const PopupModal = ({ showModal, modalPosition, toggleModal, children, overlayStyles }) => {
  const modalRef = useRef(null)

  if (!showModal) return null

  return createPortal(
    <div className='overlay' onClick={toggleModal} style={overlayStyles}>
      <div className='pm-container' ref={modalRef} style={modalPosition}>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default PopupModal
