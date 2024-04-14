import { ImageURISource } from "react-native";
import { MapMarkerProps } from "react-native-maps";

export type MarkerProps = {
  id: string;
  image: ImageURISource;
  isSelected: boolean;
  coordinate: MapMarkerProps["coordinate"];
};
