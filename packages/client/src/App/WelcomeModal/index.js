import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button, IconButton } from '@quoll/ui-components'

import Modal from '../../components/modals/Modal'

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
      <Button onClick={onConnect}>Connect Feeds</Button>
    </Actions>
  </Modal>
)

WelcomeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
}

export default WelcomeModal
