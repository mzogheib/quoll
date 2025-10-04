import React, { useEffect, useRef } from "react";
import Mapbox, { MapView, Camera, UserLocation } from "@rnmapbox/maps";

import styles from "./styles";

import { MAPBOX_ACCESS_TOKEN_PUBLIC } from "@env";
import { useRegion } from "@components/Map/region";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";
import { MarkerProps } from "./types";
import Marker from "./Marker";

if (MAPBOX_ACCESS_TOKEN_PUBLIC === undefined) {
  throw new Error("MAPBOX_ACCESS_TOKEN_PUBLIC is not defined");
}

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN_PUBLIC);

type Props = {
  center?: { latitude: number; longitude: number };
  markers: MarkerProps[] | null;
  onMarkerPress: (id: string | null) => void;
};

export const Map = ({ center, markers, onMarkerPress }: Props) => {
  const { isConnected } = useGeolocationViewModel();
  const { region } = useRegion({ center, markers });
  const cameraRef = useRef<Camera>(null);

  // Convert region to center coordinate and zoom for Mapbox
  const centerCoordinate = center
    ? [center.longitude, center.latitude]
    : [region.longitude, region.latitude];

  // Smooth transition to new region when it changes
  useEffect(() => {
    if (cameraRef.current && center) {
      cameraRef.current.setCamera({
        centerCoordinate: [center.longitude, center.latitude],
        animationDuration: 500,
      });
    }
  }, [center]);

  return (
    <MapView style={styles.wrapper} onPress={() => onMarkerPress(null)}>
      <Camera ref={cameraRef} centerCoordinate={centerCoordinate} />
      {isConnected && <UserLocation />}

      {markers?.map(({ coordinate, id }) => (
        <Marker
          id={id}
          key={id}
          coordinate={[coordinate.longitude, coordinate.latitude]}
          onPress={onMarkerPress}
        />
      ))}
    </MapView>
  );
};
