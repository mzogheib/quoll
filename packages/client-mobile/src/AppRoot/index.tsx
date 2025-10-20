import React from "react";
import { SafeAreaView } from "react-native";
import "react-native-url-polyfill/auto";

import styles from "./styles";

import NavigationContainer from "@screens/NavigationContainer";
import App from "../App";
import AuthProvider from "./AuthProvider";

const AppRoot = () => (
  <AuthProvider>
    <SafeAreaView style={styles.wrapper}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </SafeAreaView>
  </AuthProvider>
);

export default AppRoot;
