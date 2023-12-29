import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

import styles from "./styles";
import { Alert } from "react-native";

// Melbourne, Victoria
const defaultCoords = {
  latitude: -37.8136,
  longitude: 144.9631,
};

export const Map = () => {
  const [initialCoords, setInitialCoords] = useState(defaultCoords);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => {
        setInitialCoords(info.coords);
      },
      (error) => {
        const didDeny = error.code === error.PERMISSION_DENIED;

        const message = didDeny
          ? "For the best experience, please allow access to your location."
          : "Could not get current location.";

        Alert.alert(message);
      }
    );
  }, []);

  const region = {
    latitude: initialCoords.latitude,
    longitude: initialCoords.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return <MapView style={styles.wrapper} region={region} showsUserLocation />;
};
