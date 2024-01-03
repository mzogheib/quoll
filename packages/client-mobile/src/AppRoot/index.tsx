import React from "react";
import { SafeAreaView } from "react-native";
import NavigationContainer from "@screens/NavigationContainer";

import styles from "./styles";

import App from "../App";

function AppRoot() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default AppRoot;
