import {
  CameraRoll,
  GetPhotosParams,
} from "@react-native-camera-roll/camera-roll";
import { Platform, PermissionsAndroid } from "react-native";

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

export const checkIsPermitted = async () => {
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

export const requestPermission = async () => {
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

export const getMedia = async (params: {
  createdAfter: Date;
  createdBefore: Date;
}) =>
  await CameraRoll.getPhotos({
    first: 100,
    fromTime: params.createdAfter.getTime(),
    toTime: params.createdBefore.getTime(),
  });
