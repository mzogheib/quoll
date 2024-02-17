import { useCallback, useEffect, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import { Alert } from "react-native";
import { usePersistedState } from "@modules/persisted-state/logic";
import { promptAllowAccess } from "@modules/alert/logic";
import { Coords } from "../types";
import { checkIsPermitted, errors, requestPermission } from "../service";

// TODO refactor to use a model

export const useGeolocationViewModel = () => {
  const [coords, setCoords] = usePersistedState<Coords | undefined>(
    "coords",
    undefined,
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = usePersistedState(
    "isGeolocationConnected",
    false,
  );
  const [isCheckingPermission, setIsCheckingPermission] = useState(true);

  const syncPermission = useCallback(async () => {
    setIsCheckingPermission(true);
    const isPermitted = await checkIsPermitted();
    setIsConnected(isPermitted);
    setIsCheckingPermission(false);

    return isPermitted;
  }, []);

  // User may have connected previously but then, via the app settings in the
  // OS, denied permissions. We should sync that setting here too.
  useEffect(() => {
    if (!isConnected) return;

    syncPermission();
  }, [syncPermission]);

  const getPosition = useCallback(async () => {
    Geolocation.getCurrentPosition(
      (info) => {
        setCoords(info.coords);
      },
      ({ code }) => {
        const err = errors[code] ?? "PERMISSION_DENIED";

        if (err === "PERMISSION_DENIED") {
          promptAllowAccess("Quoll works best with your location.");
        } else {
          Alert.alert("Could not get current location.");
        }
      },
    );
  }, []);

  const connect = async () => {
    setIsConnecting(true);
    const isPermitted = await checkIsPermitted();

    if (isPermitted) {
      setIsConnected(true);
    } else {
      const didPermit = await requestPermission();

      if (didPermit) {
        setIsConnected(true);
      } else {
        promptAllowAccess("Quoll works best with your location.");
      }
    }
    setIsConnecting(false);
  };

  const disconnect = () => {
    setCoords(undefined);
    setIsConnected(false);
  };

  return {
    coords,
    isConnecting,
    isConnected,
    isCheckingPermission,
    connect,
    disconnect,
    getPosition,
  };
};
