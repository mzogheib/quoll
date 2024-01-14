import { useEffect, useState } from "react";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

export const useMedia = () => {
  const [isPermitted, setIsPermitted] = useState(false);

  useEffect(() => {
    const checkIsPermitted = async () => {
      try {
        const result = await CameraRoll.getPhotos({ first: 1 });

        setIsPermitted(!!result);
      } catch {
        // ...
      }
    };

    checkIsPermitted();
  }, []);

  const requestPermission = () => {
    setIsPermitted(true);
  };

  const revokePermission = () => {
    setIsPermitted(false);
  };

  return {
    requestPermission,
    revokePermission,
    isPermitted,
  };
};
