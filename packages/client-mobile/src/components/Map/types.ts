import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";
import { ImageURISource } from "react-native";

export type MarkerProps = {
  id: string;
  image: ImageURISource | null;
  position: Position;
};
