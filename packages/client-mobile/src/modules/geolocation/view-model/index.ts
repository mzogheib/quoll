import { useEffect } from "react";

import { useGeolocationModel } from "../model";

export const useGeolocationViewModel = () => {
  const model = useGeolocationModel();

  // User may have connected previously but then, via the app settings in the
  // OS, denied permissions. We should sync that setting here too.
  const { isConnected, checkPermission } = model;
  useEffect(() => {
    if (!isConnected) return;

    checkPermission();
  }, [isConnected, checkPermission]);

  return model;
};
