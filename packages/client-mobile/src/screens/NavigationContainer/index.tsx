import React, { ReactNode } from "react";
import {
  NavigationState,
  NavigationContainer as RNNavigationContainer,
} from "@react-navigation/native";

type Props = {
  children: ReactNode;
};

const NavigationContainer = ({ children }: Props) => {
  const handleStateChange = (state: NavigationState | undefined) => {
    if (!state) return;

    const { index, routeNames } = state;
    const currentRouteName = routeNames[index];

    console.log("currentRouteName", currentRouteName);
  };

  return (
    <RNNavigationContainer onStateChange={handleStateChange}>
      {children}
    </RNNavigationContainer>
  );
};

export default NavigationContainer;
