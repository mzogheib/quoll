import React, { useEffect } from "react";
import MapView from "react-native-maps";

import styles from "./styles";
import { Alert } from "react-native";
import { useGeolocation } from "../../geolocation";

// Melbourne, Victoria
const defaultCoords = {
  latitude: -37.8136,
  longitude: 144.9631,
};

export const Map = () => {
  const { coords, error } = useGeolocation(defaultCoords);

  const region = {
    latitude: coords.latitude,
    longitude: coords.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  useEffect(() => {
    if (error === undefined) return;

    const message =
      error === "PERMISSION_DENIED"
        ? "For the best experience, please allow access to your location."
        : "Could not get current location.";

    Alert.alert(message);
  }, [error]);

  return <MapView style={styles.wrapper} region={region} showsUserLocation />;
};
