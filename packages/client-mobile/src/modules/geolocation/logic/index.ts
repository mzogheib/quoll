import { useCallback, useEffect, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import { Platform, PermissionsAndroid, Alert } from "react-native";
import { usePersistedState } from "@modules/persisted-state/logic";
import { promptAllowAccess } from "@modules/alert/logic";
import { Coords } from "../types";

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

const checkIsPermitted = async () => {
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

export const useGeolocation = () => {
  const [coords, setCoords] = usePersistedState<Coords | undefined>(
    "coords",
    undefined,
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = usePersistedState(
    "isGeolocationConnected",
    false,
  );

  const checkPermissionAndConnect = useCallback(async () => {
    setIsConnecting(true);
    const isPermitted = await checkIsPermitted();
    setIsConnected(isPermitted);
    setIsConnecting(false);

    return isPermitted;
  }, []);

  // User may have connected previously but then, via the app settings in the
  // OS, denied permissions. We should sync that setting here too.
  useEffect(() => {
    if (!isConnected) return;

    checkPermissionAndConnect();
  }, [checkPermissionAndConnect]);

  const getPosition = useCallback(async () => {
    Geolocation.getCurrentPosition(
      (info) => {
        setCoords(info.coords);
      },
      ({ code }) => {
        const err = errors[code] ?? "PERMISSION_DENIED";

        if (err === "PERMISSION_DENIED") {
          promptAllowAccess("Please allow access to your location.");
        } else {
          Alert.alert("Could not get current location.");
        }
      },
    );
  }, []);

  const connect = async () => {
    const isPermitted = await checkPermissionAndConnect();

    if (isPermitted) {
      await getPosition();
    } else {
      promptAllowAccess("Please allow access to your location.");
    }
  };

  const disconnect = () => {
    setCoords(undefined);
    setIsConnected(false);
  };

  return {
    coords,
    isConnecting,
    isConnected,
    connect,
    disconnect,
    getPosition,
  };
};
