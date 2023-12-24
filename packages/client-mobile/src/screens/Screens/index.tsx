import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import styles from "./styles";

import HomeScreen from "../Home";
import SettingsScreen from "../Settings";
import { ScreenParamsMap } from "../types";

const TabNavigator = createBottomTabNavigator<ScreenParamsMap>();

/**
 * The screens with the header and tab bar hidden.
 */
const Screens = () => (
  <TabNavigator.Navigator
    screenOptions={{ headerShown: false, tabBarStyle: styles.tabBar }}
  >
    <TabNavigator.Screen name="home" component={HomeScreen} />
    <TabNavigator.Screen name="settings" component={SettingsScreen} />
  </TabNavigator.Navigator>
);

export default Screens;
