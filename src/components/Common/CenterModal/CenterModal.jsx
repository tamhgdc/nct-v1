import React from 'react'
import './CenterModal.scss'

import { IoMdClose } from 'react-icons/io'
import { PopupModal } from 'components'
import { overlayCommonStyles } from 'services/PopupModal'

const CenterModal = ({ modalName, showModal, toggleModal, children }) => {
  const popupModalProps = {
    showModal,
    toggleModal,
    overlayStyles: overlayCommonStyles,
  }

  return (
    <PopupModal {...popupModalProps}>
      <div onClick={(e) => e.stopPropagation()}>
        <div className='center-modal-container bg-color-1 sm:w-460px ip5:w-380px'>
          <div className='center-modal-header color-0-5 border-0-05'>
            <h4 className='color-0-88'>{modalName}</h4>
            <button className='close-btn' onClick={toggleModal}>
              <IoMdClose className='color-0-5' />
            </button>
          </div>
          <div className='center-modal-main'>{children}</div>
        </div>
      </div>
    </PopupModal>
  )
}

export default CenterModal
