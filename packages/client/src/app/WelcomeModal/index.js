import React from 'react'
import './style.scss'
import Modal from '../../components/modals/Modal'
import CloseIcon from 'react-icons/lib/md/close'

const WelcomeModal = ({ isOpen, onCancel, onConnect }) => (
  <Modal className="welcome-modal" isOpen={isOpen} onRequestClose={onCancel}>
    <div className="welcome-modal__header">
      <CloseIcon
        className="welcome-modal__cancel"
        size={30}
        onClick={onCancel}
      />
    </div>
    <div className="welcome-modal__title">Quoll</div>
    <div className="welcome-modal__message">Map yo' life.</div>
    <div className="welcome-modal__actions">
      <button className="welcome-modal__actions-connect" onClick={onConnect}>
        Connect Feeds
      </button>
    </div>
  </Modal>
)

export default WelcomeModal
