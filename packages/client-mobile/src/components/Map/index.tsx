import React from "react";
import MapView from "react-native-maps";

import styles from "./styles";

import { useRegion } from "@components/Map/region";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";
import Marker from "./Marker";
import { MarkerProps } from "./types";
import { OriginalAspectRatioImage } from "@components/OriginalAspectRatioImage";

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
      {markers?.map(({ coordinate, id, image, isSelected }) => {
        const { longitude, latitude } = coordinate;
        const renderCallout = image
          ? () => <OriginalAspectRatioImage source={image} width={325} />
          : undefined;

        return (
          <Marker
            key={id}
            id={id}
            coordinate={{ latitude, longitude }}
            onPress={() => onMarkerPress(id)}
            shouldShowCallout={isSelected}
            children={undefined}
            renderCallout={renderCallout}
          />
        );
      })}
    </MapView>
  );
};
