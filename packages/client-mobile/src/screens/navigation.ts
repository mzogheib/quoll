import { NavigationProp, useNavigation } from "@react-navigation/native";
import { create } from "zustand";

import { ScreenParamsMap, ScreenName } from "./types";

/**
 * @returns function to navigate to a specified screen.
 */
export const useNavigate = () =>
  useNavigation<NavigationProp<ScreenParamsMap>>().navigate;

type NavigationStore = {
  currentRouteName: ScreenName;
  setCurrentRouteName: (value: ScreenName) => void;
};

export const useNavigationStore = create<NavigationStore>((set) => ({
  // TODO get the initial value from a config variable that defines the screen stack
  currentRouteName: "home",
  setCurrentRouteName: (value: ScreenName) =>
    set(() => ({ currentRouteName: value })),
}));
