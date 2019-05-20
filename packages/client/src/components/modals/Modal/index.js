import React from 'react'
import ReactModal from 'react-modal'
import './style.scss'

ReactModal.setAppElement('#root')

export default ({ className, isOpen, onRequestClose, children }) => (
  <ReactModal
    className={`modal__content ${className}`}
    overlayClassName="modal__overlay"
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    shouldCloseOnOverlayClick
  >
    {children}
  </ReactModal>
)
