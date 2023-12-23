import React from "react";
import { SafeAreaView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import styles from "./styles";

import NavBar from "./NavBar";
import Screens from "../screens/Screens";

function App() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.content}>
        <NavigationContainer>
          <Screens />
          <NavBar />
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
}

export default App;
