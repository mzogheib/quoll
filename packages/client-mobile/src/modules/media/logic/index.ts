import { useCallback, useEffect, useState } from "react";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { promptAllowAccess } from "@modules/alert/logic";

const checkIsPermitted = async () => {
  try {
    const result = await CameraRoll.getPhotos({ first: 1 });
    return !!result;
  } catch {
    return false;
  }
};

export const useMedia = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const checkPermissionAndConnect = useCallback(async () => {
    setIsConnecting(true);
    const isPermitted = await checkIsPermitted();
    setIsConnected(isPermitted);
    setIsConnecting(false);

    return isPermitted;
  }, []);

  // Check if permission has previously been granted.
  useEffect(() => {
    checkPermissionAndConnect();
  }, [checkPermissionAndConnect]);

  const connect = async () => {
    const isPermitted = await checkPermissionAndConnect();

    if (!isPermitted) {
      promptAllowAccess("Please allow access to your photos and videos.");
    }
  };

  const disconnect = () => {
    setIsConnected(false);
  };

  return {
    connect,
    disconnect,
    isConnected,
    isConnecting,
  };
};
