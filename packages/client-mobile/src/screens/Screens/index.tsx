import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import styles from "./styles";

import HomeScreen from "../Home";
import SettingsScreen from "../Settings";

type ScreenParamsMap = {
  home: undefined;
  settings: undefined;
};

type ScreenName = keyof ScreenParamsMap;

type ScreenConfig = {
  name: ScreenName;
  title: string;
  Component: () => React.JSX.Element;
};

/**
 * The array of config for all screens.
 */
export const screens: ScreenConfig[] = [
  { name: "home", title: "Home", Component: HomeScreen },
  { name: "settings", title: "Settings", Component: SettingsScreen },
];

/**
 * @returns function to navigate to a specified screen.
 */
export const useNavigate = () =>
  useNavigation<NavigationProp<ScreenParamsMap>>().navigate;

const TabNavigator = createBottomTabNavigator<ScreenParamsMap>();

/**
 * The screens with the header and tab bar hidden.
 */
const Screens = () => (
  <TabNavigator.Navigator
    screenOptions={{ headerShown: false, tabBarStyle: styles.tabBar }}
  >
    {screens.map(({ name, Component }) => (
      <TabNavigator.Screen key="name" name={name} component={Component} />
    ))}
  </TabNavigator.Navigator>
);

export default Screens;
