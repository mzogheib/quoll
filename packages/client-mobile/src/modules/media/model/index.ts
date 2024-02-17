import { useCallback, useEffect } from "react";
import { ISO8601Date } from "@quoll/lib";

import { promptAllowAccess } from "@modules/alert/logic";
import { makeStore } from "@utils/store";
import { usePersistedState } from "@utils/persisted-state/logic";
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

export const useMediaModel = () => {
  // isConnected should be in device state so that it can be persisted
  // between app launches.
  const [isConnected, setIsConnected] = usePersistedState(
    "media::isConnected",
    false,
  );
  const { state, setProperty } = useMediaStore();

  const { isConnecting, isCheckingPermission, isRefreshing, value } = state;

  const syncPermission = useCallback(async () => {
    setProperty("isCheckingPermission", true);
    const isPermitted = await checkIsPermitted();
    setIsConnected(isPermitted);
    setProperty("isCheckingPermission", false);

    return isPermitted;
  }, []);

  // User may have connected previously but then, via the app settings in the
  // OS, denied permissions. We should sync that setting here too.
  useEffect(() => {
    if (!isConnected) return;

    syncPermission();
  }, [syncPermission]);

  const connect = async () => {
    setProperty("isConnecting", true);
    const isPermitted = await checkIsPermitted();

    if (isPermitted) {
      setIsConnected(true);
    } else {
      const didPermit = await requestPermission();

      if (didPermit) {
        setIsConnected(true);
      } else {
        promptAllowAccess("Quoll works best with your photos and videos.");
      }
    }
    setProperty("isConnecting", false);
  };

  const disconnect = () => {
    setProperty("value", []);
    setIsConnected(false);
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
    isConnected,
    isConnecting,
    isCheckingPermission,
  };
};
