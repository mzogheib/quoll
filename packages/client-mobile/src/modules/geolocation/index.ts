import { useEffect, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import { Coords } from "./types";
import { Platform, PermissionsAndroid } from "react-native";

type GeolocationError =
  | "PERMISSION_DENIED"
  | "POSITION_UNAVAILABLE"
  | "TIMEOUT"
  | "ACTIVITY_NULL";

const errors: Record<number, GeolocationError> = {
  1: "PERMISSION_DENIED",
  2: "POSITION_UNAVAILABLE",
  3: "TIMEOUT",
  4: "ACTIVITY_NULL",
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
      }
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
        setError("PERMISSION_DENIED");
        return;
      }

      Geolocation.getCurrentPosition(
        (info) => {
          setCoords(info.coords);
        },
        ({ code }) => {
          const err = errors[code] ?? "PERMISSION_DENIED";
          setError(err);
        }
      );
    };

    getPosition();
  }, []);

  return {
    coords,
    error,
  };
};
