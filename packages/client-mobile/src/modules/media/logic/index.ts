import { useCallback, useEffect, useState } from "react";
import { Platform, PermissionsAndroid } from "react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { promptAllowAccess } from "@modules/alert/logic";
import { usePersistedState } from "@modules/persisted-state/logic";

const checkIsPermittedIOS = async () =>
  !!(await CameraRoll.getPhotos({ first: 1 }));

const platformVersionAndroid = Number(Platform.Version);

const checkIsPermittedAndroid = async () => {
  if (platformVersionAndroid >= 33) {
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
      return await checkIsPermittedIOS();
    } else {
      return await checkIsPermittedAndroid();
    }
  } catch {
    return false;
  }
};

export const useMedia = () => {
  const { value: isConnected, setValue: setIsConnected } = usePersistedState(
    "isConnected",
    false,
  );
  const [isConnecting, setIsConnecting] = useState(false);

  const checkPermissionAndConnect = useCallback(async () => {
    setIsConnecting(true);
    const isPermitted = await checkIsPermitted();
    setIsConnected(isPermitted);
    setIsConnecting(false);

    return isPermitted;
  }, []);

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
