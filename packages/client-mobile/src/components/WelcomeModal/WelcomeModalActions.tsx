import React from "react";
import { Button, View } from "react-native";

import styles from "./styles";

import { useAuthViewModel } from "@modules/auth/view-model";

interface Props {
  onConnectFeeds: () => void;
}

const WelcomeModalActions = ({ onConnectFeeds }: Props) => {
  const { isAuthenticated, isAuthenticating, login, signup, logout } =
    useAuthViewModel();

  const renderUnauthed = () => (
    <View style={styles.actions}>
      <Button onPress={login} disabled={isAuthenticating} title="Log in" />
      <Button
        onPress={signup}
        disabled={isAuthenticating}
        title="or, sign up"
      />
    </View>
  );

  const renderAuthed = () => (
    <View style={styles.actions}>
      <Button
        onPress={onConnectFeeds}
        disabled={isAuthenticating}
        title="Connect feeds"
      />
      <Button onPress={logout} disabled={isAuthenticating} title="Log out" />
    </View>
  );

  return isAuthenticated ? renderAuthed() : renderUnauthed();
};

export default WelcomeModalActions;
