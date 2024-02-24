import { useCallback } from "react";
import { Alert } from "react-native";

import { promptAllowAccess } from "@components/Alert";
import { useGeolocationModel } from "../model";

export const useGeolocationViewModel = () => {
  const model = useGeolocationModel();

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
