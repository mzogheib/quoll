import React, { ReactNode } from "react";
import {
  LinkingOptions,
  NavigationContainer as RNNavigationContainer,
} from "@react-navigation/native";
import { useNavigationStore } from "@screens/navigation";
import { ScreenName, ScreenParamsMap } from "@screens/types";
import { screenConfigMap } from "@screens/config";

const screensConfig = Object.keys(screenConfigMap).reduce(
  (prev, screenName) => ({
    ...prev,
    [screenName]: { path: screenName },
  }),
  {},
);

const linking: LinkingOptions<ScreenParamsMap> = {
  prefixes: ["quoll://"],
  config: {
    initialRouteName: "home",
    screens: screensConfig,
  },
};

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
