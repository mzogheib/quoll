import React, { useEffect } from "react";
import MapView from "react-native-maps";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";

import styles from "./styles";

import ImageMarker from "./ImageMarker";
import { useRegion } from "@components/Map/region";
import { MarkerProps } from "./types";

type Props = {
  markers: MarkerProps[];
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
