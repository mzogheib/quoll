import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type ScreenParamsMap = {
  Home: undefined;
  Settings: undefined;
};

export type ScreenProps<ScreenName extends keyof ScreenParamsMap> =
  BottomTabScreenProps<ScreenParamsMap, ScreenName>;
