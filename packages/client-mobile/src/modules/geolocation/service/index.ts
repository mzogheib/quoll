import Geolocation from "@react-native-community/geolocation";
import { PermissionsAndroid, Platform } from "react-native";

type GeolocationError =
  | "PERMISSION_DENIED"
  | "POSITION_UNAVAILABLE"
  | "TIMEOUT"
  | "ACTIVITY_NULL";

export const errors: Record<number, GeolocationError> = {
  1: "PERMISSION_DENIED",
  2: "POSITION_UNAVAILABLE",
  3: "TIMEOUT",
  4: "ACTIVITY_NULL",
};

const checkIsPermittedIOS = async () => {
  return new Promise<boolean>((resolve) => {
    Geolocation.getCurrentPosition(
      () => resolve(true),
      () => resolve(false),
    );
  });
};

const checkIsPermittedAndroid = async () => {
  try {
    return await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  } catch {
    return false;
  }
};

export const checkIsPermitted = async () => {
  try {
    if (Platform.OS === "ios") {
      return await checkIsPermittedIOS();
    } else {
      return await checkIsPermittedAndroid();
    }
  } catch {
    return false;
  }
};

const requestPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Allow access",
        message: "Quoll works best with your location.",
        buttonPositive: "Allow",
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch {
    return false;
  }
};

const requestPermissionIOS = async () => false;

export const requestPermission = async () => {
  try {
    if (Platform.OS === "ios") {
      return await requestPermissionIOS();
    } else {
      return await requestPermissionAndroid();
    }
  } catch {
    return false;
  }
};
