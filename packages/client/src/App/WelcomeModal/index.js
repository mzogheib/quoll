import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../../components/modals/Modal'
import IconButton from '../../components/IconButton'
import Button from '../../components/Button'
import './style.scss'

const WelcomeModal = ({ isOpen, onCancel, onConnect }) => (
  <Modal className="welcome-modal" isOpen={isOpen} onRequestClose={onCancel}>
    <div className="welcome-modal__header">
      <IconButton.Close size={30} onClick={onCancel} />
    </div>
    <div className="welcome-modal__title">Quoll</div>
    <div className="welcome-modal__message">Map yo' life.</div>
    <div className="welcome-modal__actions">
      <Button.Primary onClick={onConnect} label="Connect Feeds" />
    </div>
  </Modal>
)

WelcomeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
}

export default WelcomeModal
