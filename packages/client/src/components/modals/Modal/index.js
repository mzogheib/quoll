import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import './style.scss'

ReactModal.setAppElement('#root')

const Modal = ({ className, isOpen, onRequestClose, children }) => (
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

Modal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal
