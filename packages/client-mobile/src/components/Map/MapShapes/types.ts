type FeaturePropertiesMarker = {
  id: string;
};

type FeaturePropertiesCluster = {
  cluster: boolean;
  cluster_id: number;
  point_count: number;
  point_count_abbreviated: string;
};

export type FeatureProperties =
  | FeaturePropertiesMarker
  | FeaturePropertiesCluster;

/**
 * Type guard to check if properties are for a marker
 */
export const isMarkerProperties = (
  properties: unknown,
): properties is FeaturePropertiesMarker => {
  if (typeof properties !== "object" || properties === null) return false;

  return "id" in properties;
};
