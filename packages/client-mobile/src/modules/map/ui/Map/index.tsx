import React, { useEffect } from "react";
import MapView from "react-native-maps";
import { useGeolocation } from "@modules/geolocation/logic";

import styles from "./styles";

// TODO: cycle through different world locations
// Centre of Australia
const defaultCoords = {
  latitude: -25.898716,
  longitude: 133.843298,
};

export const Map = () => {
  const { coords, isConnected, isCheckingPermission, getPosition } =
    useGeolocation();

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
          latitudeDelta: 50,
          longitudeDelta: 50,
        };

  useEffect(() => {
    if (isCheckingPermission) return;

    if (isConnected) getPosition();
  }, [isCheckingPermission, isConnected, getPosition]);

  return (
    <MapView
      style={styles.wrapper}
      region={region}
      showsUserLocation={isConnected}
    />
  );
};
