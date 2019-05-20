import React from 'react'
import './style.scss'
import Modal from '../Modal'

const AlertModal = ({ isOpen, message, onClose }) => (
  <Modal className="alert-modal" isOpen={isOpen} onRequestClose={onClose}>
    <div>{message}</div>
    <div className="alert-modal__actions">
      <button onClick={onClose}>OK</button>
    </div>
  </Modal>
)

export default AlertModal
