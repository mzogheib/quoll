import React, { useEffect, useRef } from "react";
import Mapbox, { MapView, Camera, UserLocation } from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";

import styles from "./styles";

import { MAPBOX_ACCESS_TOKEN_PUBLIC } from "@env";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";
import { MarkerProps } from "./types";
import Marker from "./Marker";
import { MapCamera } from "./MapCamera";

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
  // const { bounds } = useBounds({ center, markers });
  const cameraRef = useRef<Camera>(null);

  // Smooth transition to new region when it changes
  useEffect(() => {
    if (cameraRef.current === null) return;

    cameraRef.current.setCamera({
      centerCoordinate: center,
    });
  }, [center]);

  return (
    <MapView style={styles.wrapper} onPress={() => onMarkerPress(null)}>
      <MapCamera center={center} markers={markers} />
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
