import { useCallback, useEffect } from "react";
import { ISO8601Date } from "@quoll/lib";

import { promptAllowAccess } from "@components/Alert";
import { makeStore } from "@utils/store";
import { makeStorage } from "@utils/storage";
import { MediaItem } from "../types";
import { checkIsPermitted, getMedia, requestPermission } from "../service";
import { makeDateFilter } from "./utils";

type State = {
  isConnecting: boolean;
  isCheckingPermission: boolean;
  isRefreshing: boolean;
  value: MediaItem[];
};

const defaultState: State = {
  isConnecting: false,
  isCheckingPermission: true,
  isRefreshing: false,
  value: [],
};

const useMediaStore = makeStore(defaultState);

// isConnected should be in device state so that it can be persisted
// between app launches.
type StoredState = {
  isConnected: boolean;
};

const defaultStoredState: StoredState = {
  isConnected: false,
};

const useStorage = makeStorage("media", defaultStoredState);

export const useMediaModel = () => {
  const storage = useStorage();

  const { state, setProperty } = useMediaStore();

  const { isConnecting, isCheckingPermission, isRefreshing, value } = state;

  const syncPermission = useCallback(async () => {
    setProperty("isCheckingPermission", true);
    const isPermitted = await checkIsPermitted();
    storage.setProperty("isConnected", isPermitted);
    setProperty("isCheckingPermission", false);

    return isPermitted;
  }, []);

  // User may have connected previously but then, via the app settings in the
  // OS, denied permissions. We should sync that setting here too.
  useEffect(() => {
    if (!storage.state.isConnected) return;

    syncPermission();
  }, [syncPermission]);

  const connect = async () => {
    setProperty("isConnecting", true);
    const isPermitted = await checkIsPermitted();

    if (isPermitted) {
      storage.setProperty("isConnected", true);
    } else {
      const didPermit = await requestPermission();

      if (didPermit) {
        storage.setProperty("isConnected", true);
      } else {
        promptAllowAccess("Quoll works best with your photos and videos.");
      }
    }
    setProperty("isConnecting", false);
  };

  const disconnect = () => {
    setProperty("value", []);
    storage.setProperty("isConnected", false);
  };

  const refresh = useCallback(async (date: ISO8601Date) => {
    setProperty("isRefreshing", true);
    const response = await getMedia(makeDateFilter(date));
    const newValue = response.edges.map(
      (photoIdentifier) => photoIdentifier.node,
    );
    setProperty("value", newValue);
    setProperty("isRefreshing", false);
  }, []);

  return {
    value,
    connect,
    disconnect,
    refresh,
    isRefreshing,
    isConnected: storage.state.isConnected,
    isConnecting,
    isCheckingPermission,
  };
};
