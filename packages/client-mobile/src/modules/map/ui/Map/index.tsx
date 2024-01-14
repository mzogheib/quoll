import React, { useEffect } from "react";
import MapView from "react-native-maps";
import { Alert } from "react-native";
import { useGeolocation } from "@modules/geolocation/logic";

import styles from "./styles";
import { promptAllowAccess } from "@modules/alert/logic";

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

    if (error === "PERMISSION_DENIED") {
      promptAllowAccess("Please allow access to your location.");
      return;
    }

    Alert.alert("Could not get current location.");
  }, [error]);

  return <MapView style={styles.wrapper} region={region} showsUserLocation />;
};
