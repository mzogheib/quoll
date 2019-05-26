import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import Button from '../../Button'
import './style.scss'

const AlertModal = ({ isOpen, message, onClose }) => (
  <Modal className="alert-modal" isOpen={isOpen} onRequestClose={onClose}>
    <div>{message}</div>
    <div className="alert-modal__actions">
      <Button label="OK" onClick={onClose} />
    </div>
  </Modal>
)

AlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AlertModal
