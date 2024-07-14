import styled from "styled-components";
import { Button, Modal } from "@quoll/ui-components";

const InnerWrapper = styled.div`
  padding: 20px;
`;

const Actions = styled.div`
  margin: 30px 0 0;
  display: flex;
  justify-content: flex-end;
`;

interface Props {
  message: string | null;
  onClose: () => void;
}

const AlertModal = ({ message, onClose }: Props) => (
  <Modal isOpen={message !== null} onRequestClose={onClose}>
    <InnerWrapper>
      <div>{message}</div>
      <Actions>
        <Button onClick={onClose}>OK</Button>
      </Actions>
    </InnerWrapper>
  </Modal>
);

export default AlertModal;
