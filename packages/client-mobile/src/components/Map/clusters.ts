import { useState, useMemo, useCallback, useEffect } from "react";
import { ImageURISource } from "react-native";
import { Region } from "react-native-maps";
import Supercluster, { ClusterProperties, ClusterFeature } from "supercluster";
import { MarkerProps } from "./types";

type PointProperties = {
  markerId: string;
  image: ImageURISource;
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
  markers: MarkerProps[];
  region: Region;
}) => {
  const { markers, region } = params;

  const [clusters, setClusters] = useState<Cluster[] | null>(null);

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

  const updateClusters = useCallback(
    (newRegion: Region) => {
      const bbox = [
        newRegion.longitude - newRegion.longitudeDelta,
        newRegion.latitude - newRegion.latitudeDelta,
        newRegion.longitude + newRegion.longitudeDelta,
        newRegion.latitude + newRegion.latitudeDelta,
      ] as [number, number, number, number];

      const zoom = Math.floor(Math.log2(360 / newRegion.longitudeDelta)) - 1;
      const _clusters = supercluster.getClusters(bbox, zoom) as Cluster[]; // Looks like the type is wrong in the library

      setClusters(_clusters);
    },
    [markers, supercluster],
  );

  // Markers will change on a date change hence we need to update clusters
  useEffect(() => {
    updateClusters(region);
  }, [markers]);

  return { clusters, updateClusters };
};
