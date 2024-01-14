import { useEffect, useState } from "react";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

export const useMedia = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkIsConnected = async () => {
      try {
        const result = await CameraRoll.getPhotos({ first: 1 });

        setIsConnected(!!result);
      } catch {
        // ...
      }
    };

    checkIsConnected();
  }, []);

  const connect = () => {
    setIsConnected(true);
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
