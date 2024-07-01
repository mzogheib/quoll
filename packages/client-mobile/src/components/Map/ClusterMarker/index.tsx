import { View, Text } from "react-native";
import { MapMarkerProps, Marker } from "react-native-maps";
import styles from "./styles";

type Props = {
  count: number;
  coordinate: MapMarkerProps["coordinate"];
};

const ClusterMarker = ({ count, coordinate }: Props) => (
  <Marker coordinate={coordinate}>
    <View style={styles.wrapper}>
      <Text style={styles.text}>{count}</Text>
    </View>
  </Marker>
);

export default ClusterMarker;
