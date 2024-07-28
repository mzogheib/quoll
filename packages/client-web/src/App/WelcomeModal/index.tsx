import styled, { css } from "styled-components";
import { Button, ButtonPrimary, Modal } from "@quoll/ui-components";

import { useAuthViewModel } from "modules/auth/view-model";

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
  const { isAuthenticated, isAuthenticating, login, signup, logout } =
    useAuthViewModel();

  const renderUnauthed = () => (
    <Modal.Actions align="center" direction="column">
      <ButtonPrimary onClick={login} disabled={isAuthenticating}>
        Log in
      </ButtonPrimary>
      <Button onClick={signup} disabled={isAuthenticating}>
        or, sign up
      </Button>
    </Modal.Actions>
  );

  const renderAuthed = () => (
    <Modal.Actions align="center" direction="column">
      <ButtonPrimary onClick={onConnectFeeds} disabled={isAuthenticating}>
        Connect feeds
      </ButtonPrimary>
      <Button onClick={logout} disabled={isAuthenticating}>
        Log out
      </Button>
    </Modal.Actions>
  );

  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel}>
      <Modal.Inner>
        <Modal.Header onClose={onCancel} />
        <Title>Quoll</Title>
        <Message>Map ya life!</Message>
        {isAuthenticated ? renderAuthed() : renderUnauthed()}
      </Modal.Inner>
    </Modal>
  );
};

export default WelcomeModal;
