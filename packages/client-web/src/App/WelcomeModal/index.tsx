import styled, { css } from "styled-components";
import { ButtonPrimary, Modal } from "@quoll/ui-components";

const Title = styled.div(
  ({ theme: { font } }) => css`
    text-align: center;
    font-family: ${`Pacifico, ${font.family}`};
    font-size: 48px;
  `,
);

const Message = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConnect: () => void;
}

const WelcomeModal = ({ isOpen, onCancel, onConnect }: Props) => (
  <Modal isOpen={isOpen} onRequestClose={onCancel}>
    <Modal.Inner>
      <Modal.Header onClose={onCancel} />
      <Title>Quoll</Title>
      <Message>Map ya life!</Message>
      <Modal.Actions align="center">
        <ButtonPrimary onClick={onConnect}>Connect Feeds</ButtonPrimary>
      </Modal.Actions>
    </Modal.Inner>
  </Modal>
);

export default WelcomeModal;
