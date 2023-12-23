import React from "react";
import { SafeAreaView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import styles from "./styles";

import { Navigator, Screen } from "../screens";
import HomeScreen from "../screens/Home";
import SettingsScreen from "../screens/Settings";
import NavBar from "./NavBar";

function App() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.content}>
        <NavigationContainer>
          <Navigator>
            <Screen name="Home" component={HomeScreen} />
            <Screen name="Settings" component={SettingsScreen} />
          </Navigator>
          <NavBar />
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
}

export default App;
