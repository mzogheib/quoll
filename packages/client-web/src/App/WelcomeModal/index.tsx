import { useState } from "react";
import styled, { css } from "styled-components";
import { Button, ButtonPrimary, Input, Modal } from "@quoll/ui-components";

import { useUserViewModel } from "modules/user/view-model";

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
  onLoginComplete: () => void;
  onSignupComplete: () => void;
}

const WelcomeModal = ({
  isOpen,
  onCancel,
  onLoginComplete,
  onSignupComplete,
}: Props) => {
  const { user, login, signup } = useUserViewModel();

  const [userId, setUserId] = useState<string>("");

  const handleLogin = async () => {
    await login(userId);
    setUserId("");
    onLoginComplete();
  };

  const handleSignup = async () => {
    await signup();
    onSignupComplete();
  };

  const renderUnauthed = () => (
    <>
      <Input value={userId} onChange={setUserId} placeholder="User ID" />
      <Modal.Actions align="center">
        <ButtonPrimary onClick={handleLogin}>Log in</ButtonPrimary>
        <Button onClick={handleSignup}>or, sign up</Button>
      </Modal.Actions>
    </>
  );

  const renderAuthed = () => (
    <Modal.Actions align="center">
      <Button onClick={onCancel}>Log out</Button>
    </Modal.Actions>
  );

  return (
    <Modal isOpen={isOpen} onRequestClose={onCancel}>
      <Modal.Inner>
        <Modal.Header onClose={onCancel} />
        <Title>Quoll</Title>
        <Message>Map ya life!</Message>
        {user === null ? renderUnauthed() : renderAuthed()}
      </Modal.Inner>
    </Modal>
  );
};

export default WelcomeModal;
