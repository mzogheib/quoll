import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";

export type MediaItem = PhotoIdentifier["node"];

export type DateFilter = {
  createdAfter: Date;
  createdBefore: Date;
};
