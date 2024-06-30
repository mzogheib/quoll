import { useCallback, useEffect } from "react";
import { ISO8601Date } from "@quoll/lib";

import { makeStore } from "@utils/store";
import { makeStorage } from "@utils/storage";
import { MediaItem } from "../types";
import { checkIsPermitted, getMedia, requestPermission } from "../service";
import { makeDateFilter } from "./utils";

// isConnected should be stored between app launches.
const storage = makeStorage<{ isConnected: boolean }>("media");

type State = {
  isConnecting: boolean;
  isConnected: boolean;
  isCheckingPermission: boolean;
  isRefreshing: boolean;
  value: MediaItem[] | null;
};

const defaultState: State = {
  isConnecting: false,
  isConnected: !!storage.getData()?.isConnected,
  isCheckingPermission: true,
  isRefreshing: false,
  value: null,
};

const useStore = makeStore(defaultState);

export const useMediaModel = () => {
  const { state, setProperty } = useStore();

  const {
    isConnecting,
    isConnected,
    isCheckingPermission,
    isRefreshing,
    value,
  } = state;

  const checkPermission = useCallback(async () => {
    setProperty("isCheckingPermission", true);
    const isPermitted = await checkIsPermitted();
    storage.setProperty("isConnected", isPermitted);
    setProperty("isCheckingPermission", false);

    return isPermitted;
  }, []);

  // User may have connected previously but then, via the app settings in the
  // OS, denied permissions. We should sync that setting here too.
  useEffect(() => {
    if (!!storage.getData()?.isConnected) checkPermission();
  }, [checkPermission]);

  const refresh = useCallback(async (date: ISO8601Date) => {
    setProperty("isRefreshing", true);
    const response = await getMedia(makeDateFilter(date));
    const newValue = response.edges.map(
      (photoIdentifier) => photoIdentifier.node,
    );
    setProperty("value", newValue);
    setProperty("isRefreshing", false);
  }, []);

  const connect = async () => {
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
  };

  const disconnect = () => {
    setProperty("value", []);
    setProperty("isConnected", false);
    storage.setProperty("isConnected", false);
  };

  return {
    value,
    connect,
    disconnect,
    refresh,
    isRefreshing,
    isConnected,
    isConnecting,
    isCheckingPermission,
  };
};
