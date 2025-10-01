import React from "react";
import MapView, { Marker } from "react-native-maps";

import styles from "./styles";

import { useRegion } from "@components/Map/region";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";
import { MarkerProps } from "./types";

type Props = {
  markers: MarkerProps[] | null;
  onMarkerPress: (id: string | null) => void;
};

export const Map = ({ markers, onMarkerPress }: Props) => {
  const { isConnected } = useGeolocationViewModel();
  const { region } = useRegion({ markers });

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
