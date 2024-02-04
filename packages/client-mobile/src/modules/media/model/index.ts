import { useCallback, useEffect, useState } from "react";

import { promptAllowAccess } from "@modules/alert/logic";
import { usePersistedState } from "@modules/persisted-state/logic";
import { MediaItem } from "../types";
import { checkIsPermitted, getMedia, requestPermission } from "../service";

export const useMediaModel = () => {
  const [isConnected, setIsConnected] = usePersistedState("isConnected", false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCheckingPermission, setIsCheckingPermission] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [value, setValue] = usePersistedState<MediaItem[]>("mediaValue", []);

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
        promptAllowAccess("Quoll works best with your photos and videos.");
      }
    }
    setIsConnecting(false);
  };

  const disconnect = () => {
    setValue([]);
    setIsConnected(false);
  };

  const refresh = useCallback(
    async (params: { createdAfter: Date; createdBefore: Date }) => {
      setIsRefreshing(true);
      const response = await getMedia(params);
      const newValue = response.edges.map(
        (photoIdentifier) => photoIdentifier.node,
      );
      setValue(newValue);
      setIsRefreshing(false);
    },
    [],
  );

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
