import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Stack } from "./screens";
import HomeScreen from "./screens/Home";
import SettingsScreen from "./screens/Settings";

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
