import React from "react";
import { View } from "react-native";
import { PointAnnotation } from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";

import styles from "./styles";

type Props = {
  id: string;
  coordinate: Position;
  onPress: (id: string) => void;
};

const Marker = ({ id, coordinate, onPress }: Props) => (
  <PointAnnotation
    id={id}
    coordinate={coordinate}
    onSelected={() => onPress(id)}
  >
    <View style={styles.point} />
  </PointAnnotation>
);

export default Marker;
