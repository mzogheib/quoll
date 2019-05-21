import React from 'react'
import './style.scss'
import Modal from '../Modal'
import Button from '../../buttons/Button'

const AlertModal = ({ isOpen, message, onClose }) => (
  <Modal className="alert-modal" isOpen={isOpen} onRequestClose={onClose}>
    <div>{message}</div>
    <div className="alert-modal__actions">
      <Button label="OK" onClick={onClose} />
    </div>
  </Modal>
)

export default AlertModal
