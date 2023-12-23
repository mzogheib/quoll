import React from "react";
import { StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ScreenParamsMap } from "./types";

const TabNavigator = createBottomTabNavigator<ScreenParamsMap>();

const styles = StyleSheet.create({
  tabBar: {
    display: "none",
  },
});

/**
 * Tab Navigator with the header and tab bar hidden.
 */
export const Navigator = ({ children }: { children: React.ReactNode }) => (
  <TabNavigator.Navigator
    screenOptions={{ headerShown: false, tabBarStyle: styles.tabBar }}
  >
    {children}
  </TabNavigator.Navigator>
);

export const Screen = TabNavigator.Screen;

/**
 * @returns function to navigate to a specified screen.
 */
export const useNavigate = () =>
  useNavigation<NavigationProp<ScreenParamsMap>>().navigate;
