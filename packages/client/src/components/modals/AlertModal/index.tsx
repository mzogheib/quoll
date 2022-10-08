import styled from 'styled-components'
import { Button, Modal } from '@quoll/ui-components'

const InnerWrapper = styled.div`
  padding: 20px;
`

const Actions = styled.div`
  margin: 30px 0 0;
  display: flex;
  justify-content: flex-end;
`

interface Props {
  isOpen: boolean
  message: string
  onClose: () => void
}

const AlertModal = ({ isOpen, message, onClose }: Props) => (
  <Modal isOpen={isOpen} onRequestClose={onClose}>
    <InnerWrapper>
      <div>{message}</div>
      <Actions>
        <Button onClick={onClose}>OK</Button>
      </Actions>
    </InnerWrapper>
  </Modal>
)

export default AlertModal
