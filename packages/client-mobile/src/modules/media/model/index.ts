import { useCallback, useEffect, useState } from "react";
import { Platform, PermissionsAndroid } from "react-native";
import {
  CameraRoll,
  PhotoIdentifier,
} from "@react-native-camera-roll/camera-roll";
import { promptAllowAccess } from "@modules/alert/logic";
import { usePersistedState } from "@modules/persisted-state/logic";

type MediaItem = PhotoIdentifier["node"];

const platformVersionAndroid = Number(Platform.Version);

const permissions =
  platformVersionAndroid >= 33
    ? [
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]
    : [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE];

const checkIsPermittedIOS = async () =>
  !!(await CameraRoll.getPhotos({ first: 1 }));

const checkIsPermittedAndroid = async () => {
  const promises = permissions.map((permission) =>
    PermissionsAndroid.check(permission),
  );

  return Promise.all(promises).then((...results) =>
    results.every(([result]) => result === true),
  );
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

const requestPermissionAndroid = async () => {
  try {
    const result = await PermissionsAndroid.requestMultiple(permissions);

    if (platformVersionAndroid >= 33) {
      const mediaImagesResult = result["android.permission.READ_MEDIA_IMAGES"];
      const mediaVideoResult = result["android.permission.READ_MEDIA_VIDEO"];
      return [mediaImagesResult, mediaVideoResult].every(
        (result) => result === "granted",
      );
    } else {
      return result["android.permission.READ_EXTERNAL_STORAGE"] === "granted";
    }
  } catch {
    return false;
  }
};

const requestPermissionIOS = async () => false;

const requestPermission = async () => {
  try {
    if (Platform.OS === "ios") {
      return await requestPermissionIOS();
    } else {
      return await requestPermissionAndroid();
    }
  } catch {
    return false;
  }
};

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
      const response = await CameraRoll.getPhotos({
        first: 100,
        fromTime: params.createdAfter.getTime(),
        toTime: params.createdBefore.getTime(),
      });
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
