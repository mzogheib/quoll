import React from "react";
import MapView from "react-native-maps";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";

import styles from "./styles";

import ImageMarker from "./ImageMarker";
import ClusterMarker from "./ClusterMarker";
import { useRegion } from "@components/Map/utils";
import { useClusters } from "@components/Map/clusters";
import { MarkerProps } from "./types";

type Props = {
  markers: MarkerProps[];
  onMarkerPress: (id: string | null) => void;
};

export const Map = ({ markers, onMarkerPress }: Props) => {
  const { isConnected } = useGeolocationViewModel();
  const { region } = useRegion({ markers });
  const { clusters, updateClusters } = useClusters({ markers, region });

  return (
    <MapView
      style={styles.wrapper}
      region={region}
      showsUserLocation={isConnected}
      onPress={() => onMarkerPress(null)}
      onRegionChangeComplete={updateClusters}
    >
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const {
          cluster: isCluster,
          cluster_id: clusterId,
          point_count: pointCount,
          markerId,
          image,
          isSelected,
        } = cluster.properties;

        if (isCluster) {
          return (
            <ClusterMarker
              key={clusterId}
              count={pointCount}
              coordinate={{ latitude, longitude }}
            />
          );
        }

        return (
          <ImageMarker
            key={markerId}
            id={markerId}
            image={image}
            shouldShowCallout={isSelected}
            coordinate={{ latitude, longitude }}
            onPress={() => onMarkerPress(markerId)}
          />
        );
      })}
    </MapView>
  );
};
