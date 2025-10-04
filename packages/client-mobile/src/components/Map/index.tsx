import React, { useEffect, useRef } from "react";
import Mapbox, { MapView, Camera, UserLocation } from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";

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
  center?: Position;
  markers: MarkerProps[] | null;
  onMarkerPress: (id: string | null) => void;
};

export const Map = ({ center, markers, onMarkerPress }: Props) => {
  const { isConnected } = useGeolocationViewModel();
  const { region } = useRegion({ center, markers });
  const cameraRef = useRef<Camera>(null);

  // Smooth transition to new region when it changes
  useEffect(() => {
    if (cameraRef.current === null) return;

    cameraRef.current.setCamera({
      centerCoordinate: [region.longitude, region.latitude],
      animationDuration: 500,
    });
  }, [region]);

  return (
    <MapView style={styles.wrapper} onPress={() => onMarkerPress(null)}>
      <Camera
        ref={cameraRef}
        centerCoordinate={[region.longitude, region.latitude]}
      />
      {isConnected && <UserLocation />}

      {markers?.map(({ coordinate, id }) => (
        <Marker
          id={id}
          key={id}
          coordinate={coordinate}
          onPress={onMarkerPress}
        />
      ))}
    </MapView>
  );
};
