import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

/*
Adding a new screen:
1. Define the params type for the screen in ScreenParamsMap
2. Add the screen's config to screenConfigMap
3. Add the screen to the stack in the ScreenStack component
*/

/**
 * The map of params for each screen, i.e. the props that can be manually
 * set.
 */
export type ScreenParamsMap = {
  home: undefined;
  settings: undefined;
  oauth: {
    code?: string;
    state?: string;
    error?: string;
  };
};

/**
 * The internal name of the screen
 */
export type ScreenName = keyof ScreenParamsMap;

/**
 * The navigation and route props for a screen
 */
export type ScreenProps<Name extends ScreenName> = BottomTabScreenProps<
  ScreenParamsMap,
  Name
>;

type ScreenConfig = {
  /** The path for navigation */
  path: string;
  /** The title to display at the top of the screen */
  title: string;
  /** The icon to display on the nav menu  */
  icon: string;
};

export const screenConfigMap: Record<ScreenName, ScreenConfig> = {
  home: {
    path: "home",
    title: "Home",
    icon: "map",
  },
  settings: {
    path: "settings",
    title: "Settings",
    icon: "settings",
  },
  oauth: {
    path: "oauth",
    title: "OAuth",
    icon: "lock",
  },
};
