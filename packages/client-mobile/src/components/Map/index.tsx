import React, { useState, useEffect, useMemo, useCallback } from "react";
import MapView, { Region } from "react-native-maps";
import Supercluster, {
  ClusterProperties,
  ClusterFeature as IClusterFeature,
} from "supercluster";
import { ImageURISource } from "react-native";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";

import styles from "./styles";

import ImageMarker from "./ImageMarker";
import ClusterMarker from "./ClusterMarker";
import { makeRegion } from "@components/Map/utils";
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

type PointProperties = {
  markerId: string;
  image: ImageURISource;
  isSelected: boolean;
};
type ClusterFeature = IClusterFeature<PointProperties>;

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

  const supercluster = useMemo(() => {
    const _supercluster = new Supercluster<PointProperties, ClusterProperties>({
      radius: 40,
      maxZoom: 16,
    });

    _supercluster.load(
      markers.map((marker) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [
            marker.coordinate.longitude,
            marker.coordinate.latitude,
          ],
        },
        properties: {
          markerId: marker.id,
          image: marker.image,
          isSelected: marker.isSelected,
        },
      })),
    );

    return _supercluster;
  }, [markers]);

  const [clusters, setClusters] = useState<ClusterFeature[]>([]);

  const makeClusters = useCallback(
    (newRegion: Region) => {
      const bbox = [
        newRegion.longitude - newRegion.longitudeDelta,
        newRegion.latitude - newRegion.latitudeDelta,
        newRegion.longitude + newRegion.longitudeDelta,
        newRegion.latitude + newRegion.latitudeDelta,
      ] as [number, number, number, number];

      const zoom = Math.floor(Math.log2(360 / newRegion.longitudeDelta)) - 1;
      const _clusters = supercluster.getClusters(
        bbox,
        zoom,
      ) as ClusterFeature[]; // Looks like the type is wrong in the library

      setClusters(_clusters);
    },
    [markers, supercluster],
  );

  const onRegionChangeComplete = (newRegion: Region) => {
    makeClusters(newRegion);
  };

  useEffect(() => {
    makeClusters(region);
  }, [markers]);

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
