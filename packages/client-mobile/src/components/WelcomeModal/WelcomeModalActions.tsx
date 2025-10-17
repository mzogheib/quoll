import React from "react";

import { useAuthViewModel } from "@modules/auth/view-model";
import { Button } from "../../ui-components/Button";
import { Modal } from "../../ui-components/Modal";

interface Props {
  onConnectFeeds: () => void;
}

const WelcomeModalActions = ({ onConnectFeeds }: Props) => {
  const { isAuthenticated, isAuthenticating, login, signup, logout } =
    useAuthViewModel();

  const renderUnauthed = () => (
    <Modal.Actions align="center" direction="column">
      <Button
        variant="primary"
        onPress={login}
        disabled={isAuthenticating}
        title="Log in"
      />
      <Button
        onPress={signup}
        disabled={isAuthenticating}
        title="or, sign up"
      />
    </Modal.Actions>
  );

  const renderAuthed = () => (
    <Modal.Actions align="center" direction="column">
      <Button
        variant="primary"
        onPress={onConnectFeeds}
        disabled={isAuthenticating}
        title="Connect feeds"
      />
      <Button onPress={logout} disabled={isAuthenticating} title="Log out" />
    </Modal.Actions>
  );

  return isAuthenticated ? renderAuthed() : renderUnauthed();
};

export default WelcomeModalActions;
