import { Platform } from "react-native";
import { API_URL, API_URL_ANDROID } from "@env";

export const getApiBaseUrl = () => {
  if (!API_URL || !API_URL_ANDROID) {
    throw new Error("Missing API URL configuration");
  }

  const version = "/v2";
  const apiUrl = Platform.OS === "android" ? API_URL_ANDROID : API_URL;

  return `${apiUrl}${version}`;
};
