import { useEffect, useState } from "react";
import Geolocation, {
  GeolocationError,
} from "@react-native-community/geolocation";
import { Coords } from "./types";
import { Platform, PermissionsAndroid } from "react-native";

const locationNotPermittedError = {
  ACTIVITY_NULL: 4,
  PERMISSION_DENIED: 1,
  POSITION_UNAVAILABLE: 2,
  TIMEOUT: 3,
  code: 1,
  message: "Location permission was not granted.",
};

const requestPermission = async () => {
  if (Platform.OS !== "android") return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location access",
        message: "Allow access to your location for the best experience.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "Allow",
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch {
    return false;
  }
};

export const useGeolocation = (initialCoords: Coords) => {
  const [coords, setCoords] = useState(initialCoords);
  const [error, setError] = useState<GeolocationError | undefined>(undefined);

  useEffect(() => {
    const getPosition = async () => {
      const permissionGranted = await requestPermission();

      if (!permissionGranted) {
        setError(locationNotPermittedError);
        return;
      }

      Geolocation.getCurrentPosition(
        (info) => {
          setCoords(info.coords);
        },
        (error_) => {
          setError(error_);
        },
      );
    };

    getPosition();
  }, []);

  return {
    coords,
    error,
  };
};
