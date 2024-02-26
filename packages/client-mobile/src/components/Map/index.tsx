import React, { useEffect } from "react";
import { ImageURISource } from "react-native";
import MapView, { MapMarkerProps } from "react-native-maps";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";

import styles from "./styles";

import ImageMarker from "./ImageMarker";
import { makeRegion } from "@components/Map/utils";
import { useFocussedEntryViewModel } from "@modules/focussedEntry/view-model";

export type MarkerProps = {
  id: string;
  coordinate: MapMarkerProps["coordinate"];
  image: ImageURISource;
};

// TODO: cycle through different world locations
// Centre of Australia
const defaultCoords = {
  latitude: -25.898716,
  longitude: 133.843298,
};

type Props = {
  markers: MarkerProps[];
};

export const Map = ({ markers }: Props) => {
  const {
    value: coords,
    isConnected,
    isCheckingPermission,
    refresh,
  } = useGeolocationViewModel();
  const { setFocussedEntryId } = useFocussedEntryViewModel();

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
      onPress={() => setFocussedEntryId(null)}
    >
      {markers.map((props, i) => (
        <ImageMarker key={i} {...props} />
      ))}
    </MapView>
  );
};
