import { useCallback, useEffect } from "react";

import { useGeolocationModel } from "../model";
import { Alert } from "react-native";
import { promptAllowAccess } from "@modules/alert/logic";

export const useGeolocationViewModel = () => {
  const model = useGeolocationModel();

  // User may have connected previously but then, via the app settings in the
  // OS, denied permissions. We should sync that setting here too.
  const { isConnected, checkPermission } = model;
  useEffect(() => {
    if (!isConnected) return;

    checkPermission();
  }, [isConnected, checkPermission]);

  const handleError = (error: unknown, defaultMessage: string) => {
    if (error === "PERMISSION_DENIED") {
      promptAllowAccess("Quoll works best with your location.");
    } else {
      Alert.alert(defaultMessage);
    }
  };

  const connect = useCallback(async () => {
    try {
      await model.connect();
    } catch (error) {
      handleError(error, "Could not enable your current location.");
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      await model.refresh();
    } catch (error) {
      handleError(error, "Could not get your current location.");
    }
  }, []);

  return {
    ...model,
    connect,
    refresh,
  };
};
