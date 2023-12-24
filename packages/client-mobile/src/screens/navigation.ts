import { NavigationProp, useNavigation } from "@react-navigation/native";

import { ScreenParamsMap } from "./types";

/**
 * @returns function to navigate to a specified screen.
 */
export const useNavigate = () =>
  useNavigation<NavigationProp<ScreenParamsMap>>().navigate;
