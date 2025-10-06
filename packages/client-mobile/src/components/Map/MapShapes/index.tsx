import React, { useMemo } from "react";
import { ShapeSource, CircleLayer, SymbolLayer } from "@rnmapbox/maps";
import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";

import { MarkerProps } from "../types";

type FeaturePropertiesMarker = {
  id: string;
};

type FeaturePropertiesCluster = {
  cluster: boolean;
  cluster_id: number;
  point_count: number;
  point_count_abbreviated: string;
};

type FeatureProperties = FeaturePropertiesMarker | FeaturePropertiesCluster;

/**
 * Type guard to check if properties are for a marker
 */
const isMarkerProperties = (
  properties: unknown,
): properties is FeaturePropertiesMarker => {
  if (typeof properties !== "object" || properties === null) return false;

  return "id" in properties;
};

type Props = {
  markers: MarkerProps[] | null;
  onMarkerPress: (id: string | null) => void;
};

export const MapShapes = ({ markers, onMarkerPress }: Props) => {
  const featureCollection: GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    FeatureProperties
  > = useMemo(() => {
    if (!markers) return { type: "FeatureCollection", features: [] };

    return {
      type: "FeatureCollection",
      features: markers.map((marker) => ({
        type: "Feature",
        id: marker.id,
        geometry: {
          type: "Point",
          coordinates: marker.coordinate,
        },
        properties: {
          id: marker.id,
        },
      })),
    };
  }, [markers]);

  const handleShapePress = async (event: OnPressEvent) => {
    const feature = event.features[0];

    if (feature === undefined) return;

    const { properties } = feature;

    if (isMarkerProperties(properties)) onMarkerPress(properties.id);
  };

  const clusterStyle = {
    circleColor: [
      "step",
      ["get", "point_count"],
      "#51bbd6", // Color when count < 100
      100,
      "#f1f075", // Color when 100 <= count < 750
      750,
      "#f28cb1", // Color when count >= 750
    ],
    circleRadius: [
      "step",
      ["get", "point_count"],
      20, // Radius when count < 100
      100,
      30, // Radius when 100 <= count < 750
      750,
      40, // Radius when count >= 750
    ],
    circleStrokeWidth: 2,
    circleStrokeColor: "#ffffff",
  };

  const clusterCountStyle = {
    textField: ["get", "point_count_abbreviated"],
    textSize: 14,
    textColor: "#ffffff",
    textFont: ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
  };

  const markerStyle = {
    circleColor: "#007cbf",
    circleRadius: 6,
    circleStrokeWidth: 2,
    circleStrokeColor: "#ffffff",
  };

  return (
    <ShapeSource
      id="markers-source"
      shape={featureCollection}
      cluster
      clusterRadius={50}
      clusterMaxZoomLevel={14}
      onPress={handleShapePress}
    >
      {/* Cluster circles */}
      <CircleLayer
        id="clusters"
        filter={["has", "point_count"]}
        style={clusterStyle}
      />

      {/* Cluster count text */}
      <SymbolLayer
        id="cluster-count"
        filter={["has", "point_count"]}
        style={clusterCountStyle}
      />

      {/* Individual unclustered markers */}
      <CircleLayer
        id="unclustered-point"
        filter={["!", ["has", "point_count"]]}
        style={markerStyle}
      />
    </ShapeSource>
  );
};
