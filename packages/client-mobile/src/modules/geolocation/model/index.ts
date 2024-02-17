import { useCallback } from "react";
import Geolocation from "@react-native-community/geolocation";

import { usePersistedState } from "@utils/persisted-state/logic";
import { makeStore } from "@utils/store";
import { Coords } from "../types";
import { checkIsPermitted, errors, requestPermission } from "../service";

type State = {
  isConnecting: boolean;
  isCheckingPermission: boolean;
  isRefreshing: boolean;
  value: Coords | undefined;
};

const defaultState: State = {
  isConnecting: false,

  isCheckingPermission: true,
  isRefreshing: false,
  value: undefined,
};

const useGeolocationStore = makeStore(defaultState);

export const useGeolocationModel = () => {
  // isConnected should be in device state so that it can be persisted
  // between app launches.
  const [isConnected, setIsConnected] = usePersistedState(
    "geolocation::isConnected",
    false,
  );

  const { state, setProperty } = useGeolocationStore();

  const { value, isConnecting, isRefreshing, isCheckingPermission } = state;

  const checkPermission = useCallback(async () => {
    setProperty("isCheckingPermission", true);
    const isPermitted = await checkIsPermitted();
    setIsConnected(isPermitted);
    setProperty("isCheckingPermission", false);
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

  const connect = useCallback(async () => {
    setProperty("isConnecting", true);
    const isPermitted = await checkIsPermitted();
    setProperty("isConnecting", false);

    if (isPermitted) {
      setIsConnected(true);
    } else {
      const didPermit = await requestPermission();

      if (didPermit) {
        setIsConnected(true);
      } else {
        throw "PERMISSION_DENIED";
      }
    }
  }, []);

  const disconnect = useCallback(() => {
    setProperty("value", undefined);
    setIsConnected(false);
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
    checkPermission,
  };
};
