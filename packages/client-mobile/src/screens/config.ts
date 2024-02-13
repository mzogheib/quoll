import { LinkingOptions, PathConfigMap } from "@react-navigation/native";

import { ScreenName, ScreenParamsMap } from "./types";

type ScreenConfig = {
  title: string;
  icon: string;
};

export const screenConfigMap: Record<ScreenName, ScreenConfig> = {
  home: {
    title: "Home",
    icon: "map",
  },
  settings: {
    title: "Settings",
    icon: "settings",
  },
};

const screens: PathConfigMap<ScreenParamsMap> = Object.keys(
  screenConfigMap,
).reduce(
  (prev, screenName) => ({
    ...prev,
    [screenName]: { path: screenName },
  }),
  {},
);

/**
 * The deep linking config.
 */
export const linking: LinkingOptions<ScreenParamsMap> = {
  prefixes: ["quoll://"],
  config: { initialRouteName: "home", screens },
};
