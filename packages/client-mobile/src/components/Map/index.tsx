import React, { useState } from "react";
import MapView from "react-native-maps";

import styles from "./styles";

import { useClusters } from "@components/Map/clusters";
import { useRegion } from "@components/Map/region";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";
import Marker from "./Marker";
import ClusterMarker from "./ClusterMarker";
import { MarkerProps } from "./types";
import { OriginalAspectRatioImage } from "@components/OriginalAspectRatioImage";

type Props = {
  markers: MarkerProps[] | null;
  onMarkerPress: (id: string | null) => void;
};

export const Map = ({ markers, onMarkerPress }: Props) => {
  const { isConnected } = useGeolocationViewModel();
  const { region: initialRegion } = useRegion({ markers });
  const [region, setRegion] = useState(initialRegion);
  const { clusters } = useClusters({ markers, region });

  return (
    <MapView
      style={styles.wrapper}
      region={initialRegion}
      showsUserLocation={isConnected}
      onPress={() => onMarkerPress(null)}
      onRegionChangeComplete={setRegion}
    >
      {clusters?.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const {
          cluster: isCluster,
          cluster_id,
          point_count,
          markerId,
          image,
          isSelected,
        } = cluster.properties;

        if (isCluster) {
          return (
            <ClusterMarker
              key={cluster_id}
              count={point_count}
              coordinate={{ latitude, longitude }}
            />
          );
        }

        const renderCallout = image
          ? () => <OriginalAspectRatioImage source={image} width={325} />
          : undefined;
        const markerChildren = image ? (
          <OriginalAspectRatioImage source={image} width={40} height={40} />
        ) : null;

        return (
          <Marker
            key={markerId}
            id={markerId}
            shouldShowCallout={isSelected}
            coordinate={{ latitude, longitude }}
            onPress={() => onMarkerPress(markerId)}
            renderCallout={renderCallout}
          >
            {markerChildren}
          </Marker>
        );
      })}
    </MapView>
  );
};
