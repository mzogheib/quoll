import React from "react";
import { SafeAreaView, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import styles from "./styles";

import { Tab } from "../screens";
import HomeScreen from "../screens/Home";
import SettingsScreen from "../screens/Settings";

function App() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.content}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
}

export default App;
