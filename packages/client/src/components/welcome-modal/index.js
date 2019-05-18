import React from 'react'
import './style.scss'
import Modal from '../modal'
import CloseIcon from 'react-icons/lib/md/close'

const WelcomeModal = ({ isOpen, onCancel, onConnect }) => {
  const renderContent = () => (
    <div className="welcome-modal">
      <div className="welcome-modal__header">
        <CloseIcon
          className="welcome-modal__cancel"
          size={30}
          onClick={onCancel}
        />
      </div>
      <div className="welcome-modal__title">Quoll</div>
      <div className="welcome-modal__message">
        <span>Map yo' life.</span>
      </div>
      <div className="welcome-modal__actions">
        <button className="welcome-modal__actions-connect" onClick={onConnect}>
          Connect Feeds
        </button>
      </div>
    </div>
  )

  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel} maxWidth={400}>
      {renderContent()}
    </Modal>
  )
}

export default WelcomeModal
