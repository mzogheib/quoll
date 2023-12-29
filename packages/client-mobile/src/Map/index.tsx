import React from "react";
import MapView from "react-native-maps";
import styles from "./styles";

// Melbourne, Victoria
const initialCoords = {
  latitude: -37.8136,
  longitude: 144.9631,
};

export const Map = () => {
  const region = {
    latitude: initialCoords.latitude,
    longitude: initialCoords.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return <MapView style={styles.wrapper} initialRegion={region} />;
};
