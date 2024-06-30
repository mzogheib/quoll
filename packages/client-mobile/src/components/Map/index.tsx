import React, { useEffect } from "react";
import MapView, { Region } from "react-native-maps";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";

import styles from "./styles";

import ImageMarker from "./ImageMarker";
import ClusterMarker from "./ClusterMarker";
import { makeRegion, useClusters } from "@components/Map/utils";
import { MarkerProps } from "./types";

// TODO: cycle through different world locations
// Centre of Australia
const defaultCoords = {
  latitude: -25.898716,
  longitude: 133.843298,
};

type Props = {
  markers: MarkerProps[];
  onMarkerPress: (id: string | null) => void;
};

export const Map = ({ markers, onMarkerPress }: Props) => {
  const {
    value: coords,
    isConnected,
    isCheckingPermission,
    refresh,
  } = useGeolocationViewModel();

  const markersRegion = makeRegion(markers.map((marker) => marker.coordinate));

  const userRegion =
    isConnected && coords
      ? {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }
      : {
          latitude: defaultCoords.latitude,
          longitude: defaultCoords.longitude,
          latitudeDelta: 50,
          longitudeDelta: 50,
        };

  const region = markersRegion ?? userRegion;

  useEffect(() => {
    if (isCheckingPermission) return;

    if (isConnected) refresh();
  }, [isCheckingPermission, isConnected, refresh]);

  const { clusters, updateClusters } = useClusters({ markers, region });

  const onRegionChangeComplete = (newRegion: Region) => {
    updateClusters(newRegion);
  };

  return (
    <MapView
      style={styles.wrapper}
      region={region}
      showsUserLocation={isConnected}
      onPress={() => onMarkerPress(null)}
      onRegionChangeComplete={onRegionChangeComplete}
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
