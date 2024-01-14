import { useCallback, useEffect, useState } from "react";
import { Platform, PermissionsAndroid } from "react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { promptAllowAccess } from "@modules/alert/logic";

const platformVersion = Number(Platform.Version);

const checkIsPermittedAndroid = async () => {
  if (platformVersion >= 33) {
    return Promise.all([
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      ),
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
    ]).then(
      ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
        hasReadMediaImagesPermission && hasReadMediaVideoPermission,
    );
  } else {
    return PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
  }
};

const checkIsPermitted = async () => {
  try {
    if (Platform.OS === "ios") {
      const result = await CameraRoll.getPhotos({ first: 1 });
      return !!result;
    } else {
      const result = await checkIsPermittedAndroid();
      return !!result;
    }
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
