import { NavigationProp, useNavigation } from "@react-navigation/native";

import { makeStore } from "@utils/store";
import { ScreenParamsMap, ScreenName } from "./config";

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
