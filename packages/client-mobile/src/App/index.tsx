import React from "react";
import { SafeAreaView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import styles from "./styles";

import NavBar from "./NavBar";
import Screens from "../screens/Screens";
import { useIsNarrow } from "../dimensions";

function App() {
  const isNarrow = useIsNarrow();

  const wrapperStyles = isNarrow
    ? styles.navContentNarrow
    : styles.navContentWide;

  return (
    <SafeAreaView style={styles.wrapper}>
      <NavigationContainer>
        <View style={wrapperStyles}>
          <Screens />
          <NavBar />
        </View>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
