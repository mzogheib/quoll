import { useCallback, useEffect } from "react";
import Geolocation from "@react-native-community/geolocation";

import { makeStorage } from "@utils/storage";
import { makeStore } from "@utils/store";
import { Coords } from "../types";
import { checkIsPermitted, errors, requestPermission } from "../service";

// isConnected should be stored between app launches.
const storage = makeStorage<{ isConnected: boolean }>("geolocation");

type State = {
  isConnecting: boolean;
  isConnected: boolean;
  isCheckingPermission: boolean;
  isRefreshing: boolean;
  value: Coords | undefined;
};

const defaultState: State = {
  isConnecting: false,
  isConnected: !!storage.getData()?.isConnected,
  isCheckingPermission: true,
  isRefreshing: false,
  value: undefined,
};

const useStore = makeStore(defaultState);

export const useGeolocationModel = () => {
  const { state, setProperty } = useStore();

  const {
    value,
    isConnecting,
    isConnected,
    isRefreshing,
    isCheckingPermission,
  } = state;

  const checkPermission = useCallback(async () => {
    setProperty("isCheckingPermission", true);
    const isPermitted = await checkIsPermitted();
    storage.setProperty("isConnected", isPermitted);
    setProperty("isCheckingPermission", false);
  }, []);

  // User may have connected previously but then, via the app settings in the
  // OS, denied permissions. We should sync that setting here too.
  useEffect(() => {
    if (!!storage.getData()?.isConnected) checkPermission();
  }, [checkPermission]);

  const connect = useCallback(async () => {
    setProperty("isConnecting", true);
    const isPermitted = await checkIsPermitted();
    setProperty("isConnecting", false);

    if (isPermitted) {
      setProperty("isConnected", true);
      storage.setProperty("isConnected", true);
    } else {
      const didPermit = await requestPermission();

      if (didPermit) {
        setProperty("isConnected", true);
        storage.setProperty("isConnected", true);
      } else {
        throw "PERMISSION_DENIED";
      }
    }
  }, []);

  const disconnect = useCallback(() => {
    setProperty("value", undefined);
    setProperty("isConnected", false);
    storage.setProperty("isConnected", false);
  }, []);

  const refresh = useCallback(async () => {
    return new Promise<void>((resolve, reject) => {
      setProperty("isRefreshing", true);
      Geolocation.getCurrentPosition(
        (info) => {
          setProperty("value", info.coords);
          setProperty("isRefreshing", false);
          return resolve();
        },
        ({ code }) => {
          const error = errors[code] ?? "PERMISSION_DENIED";

          setProperty("isRefreshing", false);

          return reject(error);
        },
      );
    });
  }, []);

  return {
    value,
    isRefreshing,
    isConnecting,
    isConnected,
    isCheckingPermission,
    connect,
    disconnect,
    refresh,
  };
};
