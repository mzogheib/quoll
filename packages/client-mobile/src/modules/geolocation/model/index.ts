import { useCallback, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import { Alert } from "react-native";

import { usePersistedState } from "@modules/persisted-state/logic";
import { promptAllowAccess } from "@modules/alert/logic";
import { Coords } from "../types";
import { checkIsPermitted, errors, requestPermission } from "../service";
import { makeStore } from "../../../store";

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

  const getPosition = useCallback(async () => {
    Geolocation.getCurrentPosition(
      (info) => {
        setProperty("value", info.coords);
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

  const connect = useCallback(async () => {
    setProperty("isConnecting", true);
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
    setProperty("isConnecting", false);
  }, []);

  const disconnect = useCallback(() => {
    setProperty("value", undefined);
    setIsConnected(false);
  }, []);

  return {
    value,
    isConnecting,
    isConnected,
    isCheckingPermission,
    connect,
    disconnect,
    getPosition,
    checkPermission,
  };
};
