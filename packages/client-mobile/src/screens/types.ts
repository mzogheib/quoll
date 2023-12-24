import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type ScreenParamsMap = {
  home: undefined;
  settings: undefined;
};

export type ScreenName = keyof ScreenParamsMap;

/**
 * The props for a screen.
 */
export type ScreenProps<Name extends ScreenName> = BottomTabScreenProps<
  ScreenParamsMap,
  Name
>;
