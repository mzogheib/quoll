import React, { ReactNode } from "react";
import { NavigationContainer as RNNavigationContainer } from "@react-navigation/native";
import { useNavigationStore } from "@screens/navigation";
import { ScreenName } from "@screens/config";

type Props = {
  children: ReactNode;
};

const NavigationContainer = ({ children }: Props) => {
  const { setProperty } = useNavigationStore();

  return (
    <RNNavigationContainer
      onStateChange={(state) => {
        if (!state) return;

        const { index, routeNames } = state;
        // TODO avoid the type cast
        const currentRouteName = routeNames[index] as ScreenName;

        setProperty("currentRouteName", currentRouteName);
      }}
    >
      {children}
    </RNNavigationContainer>
  );
};

export default NavigationContainer;
