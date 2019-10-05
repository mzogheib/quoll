import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button, Modal } from '@quoll/ui-components'

const StyledModal = styled(Modal)`
  padding: 20px;
`

const Actions = styled.div`
  margin: 30px 0 0;
  display: flex;
  justify-content: flex-end;
`

const AlertModal = ({ isOpen, message, onClose }) => (
  <StyledModal isOpen={isOpen} onRequestClose={onClose}>
    <div>{message}</div>
    <Actions>
      <Button onClick={onClose}>OK</Button>
    </Actions>
  </StyledModal>
)

AlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AlertModal
