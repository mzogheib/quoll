import React from "react";
import { SafeAreaView } from "react-native";
import { Auth0Provider } from "react-native-auth0";
import NavigationContainer from "@screens/NavigationContainer";

import styles from "./styles";

import App from "../App";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "@env";

function AppRoot() {
  if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID) {
    throw new Error("Missing Auth0 configuration");
  }

  return (
    <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
      <SafeAreaView style={styles.wrapper}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </SafeAreaView>
    </Auth0Provider>
  );
}

export default AppRoot;
