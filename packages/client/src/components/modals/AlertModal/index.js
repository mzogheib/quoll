import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Flex, Button, Modal } from '@quoll/ui-components'

const StyledModal = styled(Modal)`
  padding: 20px;
`
const AlertModal = ({ isOpen, message, onClose }) => (
  <StyledModal isOpen={isOpen} onRequestClose={onClose}>
    <div>{message}</div>
    <Flex mt={30} justifyContent="flex-end">
      <Button onClick={onClose}>OK</Button>
    </Flex>
  </StyledModal>
)

AlertModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AlertModal
