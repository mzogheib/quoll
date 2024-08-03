import styled, { css } from "styled-components";
import { Modal } from "@quoll/ui-components";

import WelcomeModalActions from "./WelcomeModalActions";

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
  onConnectFeeds: () => void;
}

const WelcomeModal = ({ isOpen, onCancel, onConnectFeeds }: Props) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel}>
      <Modal.Inner>
        <Modal.Header onClose={onCancel} />
        <Title>Quoll</Title>
        <Message>Map ya life!</Message>
        <WelcomeModalActions
          onLoginComplete={onCancel}
          onSignupComplete={onConnectFeeds}
        />
      </Modal.Inner>
    </Modal>
  );
};

export default WelcomeModal;
