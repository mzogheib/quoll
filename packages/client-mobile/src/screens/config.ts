import { LinkingOptions, PathConfigMap } from "@react-navigation/native";

import { ScreenName, ScreenParamsMap } from "./types";

type ScreenConfig = {
  /**
   * The title to display at the top of the screen
   */
  title: string;
  /**
   * The icon to display on the nav menu
   */
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
