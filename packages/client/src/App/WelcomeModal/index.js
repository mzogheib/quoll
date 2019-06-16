import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Modal from '../../components/modals/Modal'
import IconButton from '../../components/IconButton'
import Button from '../../components/Button'

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`

const Title = styled.div`
  text-align: center;
  font-family: Pacifico, Roboto, sans-serif;
  font-size: 48px;
`

const Message = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Actions = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0 30px;
`

const WelcomeModal = ({ isOpen, onCancel, onConnect }) => (
  <Modal isOpen={isOpen} onRequestClose={onCancel}>
    <Header>
      <IconButton.Close size={30} onClick={onCancel} />
    </Header>
    <Title>Quoll</Title>
    <Message>Map yo' life.</Message>
    <Actions>
      <Button.Primary onClick={onConnect}>Connect Feeds</Button.Primary>
    </Actions>
  </Modal>
)

WelcomeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
}

export default WelcomeModal
