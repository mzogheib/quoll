import { Button, ButtonPrimary, Modal } from "@quoll/ui-components";

import { useAuthViewModel } from "modules/auth/view-model";

interface Props {
  onConnectFeeds: () => void;
}

const WelcomeModalActionsNewAuth = ({ onConnectFeeds }: Props) => {
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

  return isAuthenticated ? renderAuthed() : renderUnauthed();
};

export default WelcomeModalActionsNewAuth;
