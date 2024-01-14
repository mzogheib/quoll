import { useState } from "react";
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

  const connect = async () => {
    const isPermitted = await checkIsPermitted();
    setIsConnected(isPermitted);

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
  };
};
