import { NavigationProp, useNavigation } from "@react-navigation/native";

import { ScreenParamsMap, ScreenName } from "./config";
import { makeStore } from "../store";

/**
 * @returns function to navigate to a specified screen.
 */
export const useNavigate = () =>
  useNavigation<NavigationProp<ScreenParamsMap>>().navigate;

type State = {
  currentRouteName: ScreenName;
};

const defaultState: State = {
  currentRouteName: "home",
};

export const useNavigationStore = makeStore(defaultState);
