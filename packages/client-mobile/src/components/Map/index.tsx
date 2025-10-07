import React from "react";
import Mapbox, { MapView, UserLocation } from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";

import styles from "./styles";

import { MAPBOX_ACCESS_TOKEN_PUBLIC } from "@env";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";
import { MarkerProps } from "./types";
import { MapCamera } from "./MapCamera";
import { MapShapes } from "./MapShapes";

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

  return (
    <MapView style={styles.wrapper} onPress={() => onMarkerPress(null)}>
      <MapCamera center={center} markers={markers} />
      {isConnected && <UserLocation />}

      {markers !== null && (
        <MapShapes markers={markers} onMarkerPress={onMarkerPress} />
      )}
    </MapView>
  );
};
