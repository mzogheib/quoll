import { useCallback } from "react";
import { Alert } from "react-native";
import { ISO8601Date } from "@quoll/lib";

import { promptAllowAccess } from "@components/Alert";
import { useMediaModel } from "../model";

export const useMediaViewModel = () => {
  const model = useMediaModel();

  const handleError = (error: unknown, defaultMessage: string) => {
    if (error === "PERMISSION_DENIED") {
      promptAllowAccess("Quoll works best with your photos and videos.");
    } else {
      Alert.alert(defaultMessage);
    }
  };

  const connect = useCallback(async () => {
    try {
      await model.connect();
    } catch (error) {
      handleError(error, "Could not access your photos and videos.");
    }
  }, []);

  const refresh = useCallback(async (date: ISO8601Date) => {
    try {
      await model.refresh(date);
    } catch (error) {
      handleError(error, "Could not get your photos and videos.");
    }
  }, []);

  return {
    ...model,
    connect,
    refresh,
  };
};
