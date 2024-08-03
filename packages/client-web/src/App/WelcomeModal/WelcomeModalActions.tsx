import { useState } from "react";
import { Button, ButtonPrimary, Input, Modal } from "@quoll/ui-components";

import { useUserViewModel } from "modules/user/view-model";

interface Props {
  onLoginComplete: () => void;
  onSignupComplete: () => void;
}

const WelcomeModal = ({ onLoginComplete, onSignupComplete }: Props) => {
  const { user, login, signup, logout } = useUserViewModel();

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
      <Modal.Actions align="center" direction="column">
        <ButtonPrimary onClick={handleLogin}>Log in</ButtonPrimary>
        <Button onClick={handleSignup}>or, sign up</Button>
      </Modal.Actions>
    </>
  );

  const renderAuthed = () => (
    <Modal.Actions align="center" direction="column">
      <Button onClick={logout}>Log out</Button>
    </Modal.Actions>
  );

  return user === null ? renderUnauthed() : renderAuthed();
};

export default WelcomeModal;
