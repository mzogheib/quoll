import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

export type ScreenProps<ScreenName extends keyof RootStackParamList> =
  BottomTabScreenProps<RootStackParamList, ScreenName>;
