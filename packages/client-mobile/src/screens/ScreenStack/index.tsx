import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import styles from "./styles";

import HomeScreen from "../Home";
import SettingsScreen from "../Settings";
import { ScreenParamsMap } from "@screens/config";
import OAuthScreen from "@screens/OAuth";

const TabNavigator = createBottomTabNavigator<ScreenParamsMap>();

/**
 * The screens with the header and tab bar hidden.
 */
const ScreenStack = () => (
  <TabNavigator.Navigator
    screenOptions={{ headerShown: false, tabBarStyle: styles.tabBar }}
  >
    <TabNavigator.Screen name="home" component={HomeScreen} />
    <TabNavigator.Screen name="settings" component={SettingsScreen} />
    <TabNavigator.Screen name="oauth" component={OAuthScreen} />
  </TabNavigator.Navigator>
);

export default ScreenStack;
