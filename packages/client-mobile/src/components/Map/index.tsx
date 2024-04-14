import React, { useEffect } from "react";
import MapView from "react-native-maps";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";

import styles from "./styles";

import ImageMarker from "./ImageMarker";
import { makeRegion } from "@components/Map/utils";
import { MarkerProps } from "./types";

// TODO: cycle through different world locations
// Centre of Australia
const defaultCoords = {
  latitude: -25.898716,
  longitude: 133.843298,
};

type Props = {
  markers: MarkerProps[];
  onMarkerPress: (id: string | null) => void;
};

export const Map = ({ markers, onMarkerPress }: Props) => {
  const {
    value: coords,
    isConnected,
    isCheckingPermission,
    refresh,
  } = useGeolocationViewModel();

  const markersRegion = makeRegion(markers.map((marker) => marker.coordinate));

  const userRegion =
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

  const region = markersRegion ?? userRegion;

  useEffect(() => {
    if (isCheckingPermission) return;

    if (isConnected) refresh();
  }, [isCheckingPermission, isConnected, refresh]);

  return (
    <MapView
      style={styles.wrapper}
      region={region}
      showsUserLocation={isConnected}
      onPress={() => onMarkerPress(null)}
    >
      {markers.map(({ id, image, isSelected, coordinate }, i) => (
        <ImageMarker
          key={i}
          id={id}
          image={image}
          shouldShowCallout={isSelected}
          coordinate={coordinate}
          onPress={() => onMarkerPress(id)}
        />
      ))}
    </MapView>
  );
};
