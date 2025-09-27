import { useMemo } from "react";
import { ImageURISource } from "react-native";
import { Region } from "react-native-maps";
import Supercluster, { ClusterProperties, ClusterFeature } from "supercluster";
import { MarkerProps } from "./types";

type PointProperties = {
  markerId: string;
  image: ImageURISource | null;
  isSelected: boolean;
};
type Cluster = ClusterFeature<PointProperties>;

/**
 * A hook to manage clustering of markers on a map. Will update clusters on
 * change of markers.
 *
 * @returns clusters The clusters to display on the map.
 * @returns updateClusters Update the clusters based on the given region.
 */
export const useClusters = (params: {
  markers: MarkerProps[] | null;
  region: Region;
}) => {
  const { markers, region } = params;

  const supercluster = useMemo(() => {
    if (!markers) return null;

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

  const clusters = useMemo(() => {
    const bbox = [
      region.longitude - region.longitudeDelta,
      region.latitude - region.latitudeDelta,
      region.longitude + region.longitudeDelta,
      region.latitude + region.latitudeDelta,
    ] as [number, number, number, number];

    const zoom = Math.floor(Math.log2(360 / region.longitudeDelta)) - 1;
    const _clusters =
      supercluster === null
        ? null
        : (supercluster.getClusters(bbox, zoom) as Cluster[]); // Looks like the type is wrong in the library

    return _clusters;
  }, [
    region.latitude,
    region.latitudeDelta,
    region.longitude,
    region.longitudeDelta,
    supercluster,
  ]);

  return { clusters };
};
