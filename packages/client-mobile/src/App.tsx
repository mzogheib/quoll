import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { Tab } from "./screens";
import HomeScreen from "./screens/Home";
import SettingsScreen from "./screens/Settings";

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
