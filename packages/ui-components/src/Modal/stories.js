import React, { useState } from 'react'
import styled from 'styled-components'

import Button from '../Button'

import Modal from '.'

export default { title: 'Modal' }

Modal.setAppElement('#root')

const Wrapper = styled.div`
  width: 200px;

  > ${Button} {
    margin: 10px 0;
  }
`

const DefaultModal = ({ isOpen, onClose, className }) => (
  <Modal isOpen={isOpen} onRequestClose={onClose} className={className}>
    This is a modal. You can close it by pressing the escape key, clicking
    outside the modal or clicking on the button below.
    <Button onClick={onClose}>Close modal</Button>
  </Modal>
)

const NarrowModalWrapper = styled(Modal)`
  max-width: 200px;
`

const NarrowModal = ({ isOpen, onClose, className }) => (
  <NarrowModalWrapper
    isOpen={isOpen}
    onRequestClose={onClose}
    className={className}
  >
    This is a narrow modal. You can close it by pressing the escape key,
    clicking outside the modal or clicking on the button below.
    <Button onClick={onClose}>Close modal</Button>
  </NarrowModalWrapper>
)

export const Default = () => {
  const [isDefaultModalOpen, setDefaultModalOpen] = useState(false)
  const [isNarrowModalOpen, setNarrowModalOpen] = useState(false)
  return (
    <Wrapper>
      <Button onClick={() => setDefaultModalOpen(true)}>
        Open default modal
      </Button>
      <Button onClick={() => setNarrowModalOpen(true)}>
        Open narrow modal
      </Button>
      <DefaultModal
        isOpen={isDefaultModalOpen}
        onClose={() => setDefaultModalOpen(false)}
      />
      <NarrowModal
        isOpen={isNarrowModalOpen}
        onClose={() => setNarrowModalOpen(false)}
      />
    </Wrapper>
  )
}
