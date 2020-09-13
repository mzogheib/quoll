import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button, Modal } from '@quoll/ui-components'

const InnerWrapper = styled.div`
  padding: 20px;
`

const Actions = styled.div`
  margin: 30px 0 0;
  display: flex;
  justify-content: flex-end;
`

const AlertModal = ({ isOpen, message, onClose }) => (
  <Modal isOpen={isOpen} onRequestClose={onClose}>
    <InnerWrapper>
      <div>{message}</div>
      <Actions>
        <Button onClick={onClose}>OK</Button>
      </Actions>
    </InnerWrapper>
  </Modal>
)

AlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AlertModal
