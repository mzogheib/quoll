import React, { useEffect } from "react";
import MapView from "react-native-maps";
import { useGeolocation } from "@modules/geolocation/logic";

import styles from "./styles";

// Melbourne, Victoria
const defaultCoords = {
  latitude: -37.8136,
  longitude: 144.9631,
};

export const Map = () => {
  const { coords, isConnected, getPosition } = useGeolocation();

  const region =
    isConnected && coords
      ? {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }
      : {
          latitude: defaultCoords.latitude,
          longitude: defaultCoords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        };

  useEffect(() => {
    if (isConnected) {
      getPosition();
    }
  }, [isConnected, getPosition]);

  return <MapView style={styles.wrapper} region={region} showsUserLocation />;
};
