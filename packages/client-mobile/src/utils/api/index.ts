import { Platform } from "react-native";
import { API_URL, API_URL_ANDROID } from "@env";

export const getApiBaseUrl = () => {
  const version = "";
  const apiUrl = Platform.OS === "android" ? API_URL_ANDROID : API_URL;

  return `${apiUrl}${version}`;
};
