import React from "react";
import MapView, { LatLng, Marker } from "react-native-maps";

import styles from "./styles";

import { useRegion } from "@components/Map/region";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";
import { MarkerProps } from "./types";

type Props = {
  center?: LatLng;
  markers: MarkerProps[] | null;
  onMarkerPress: (id: string | null) => void;
};

export const Map = ({ center, markers, onMarkerPress }: Props) => {
  const { isConnected } = useGeolocationViewModel();
  const { region } = useRegion({ center, markers });

  return (
    <MapView
      style={styles.wrapper}
      region={region}
      showsUserLocation={isConnected}
      onPress={() => onMarkerPress(null)}
    >
      {markers?.map(({ coordinate, id }) => (
        <Marker
          key={id}
          coordinate={coordinate}
          onPress={(event) => {
            onMarkerPress(id);
            event.stopPropagation();
          }}
        />
      ))}
    </MapView>
  );
};
