import React from "react";
import { SafeAreaView } from "react-native";
import NavigationContainer from "@screens/NavigationContainer";

import styles from "./styles";

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
