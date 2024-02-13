import React, { ReactNode } from "react";
import { NavigationContainer as RNNavigationContainer } from "@react-navigation/native";

import { useNavigationStore } from "@screens/navigation";
import { ScreenName } from "@screens/types";
import { linking } from "@screens/config";

type Props = {
  children: ReactNode;
};

const NavigationContainer = ({ children }: Props) => {
  const { setCurrentRouteName } = useNavigationStore();

  return (
    <RNNavigationContainer
      linking={linking}
      onStateChange={(state) => {
        if (!state) return;

        const { index, routeNames } = state;
        const currentRouteName = routeNames[index];

        // TODO avoid the type cast
        setCurrentRouteName(currentRouteName as ScreenName);
      }}
    >
      {children}
    </RNNavigationContainer>
  );
};

export default NavigationContainer;
