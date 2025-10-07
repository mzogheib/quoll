import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";

export type Bounds = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
};

/**
 * Calculate the outer bounds for a given array of points.
 *
 * Solution from ChatGPT on 2023-05-22
 * https://chat.openai.com/c/b2350c2b-4feb-4a1c-9853-8d1ad6c240b7
 *
 * @param points The array of points.
 * @param paddingMeters An optional distance in meters beyond the bounds. This can be used to simulate a zoom level when displaying the bounds on a map.
 * @returns
 */
export const findBounds = (
  points: Position[],
  paddingMeters: number = 0,
): Bounds => {
  let minLat = Number.POSITIVE_INFINITY;
  let maxLat = Number.NEGATIVE_INFINITY;
  let minLng = Number.POSITIVE_INFINITY;
  let maxLng = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [longitude, latitude] = point;
    if (latitude < minLat) {
      minLat = latitude;
    }
    if (latitude > maxLat) {
      maxLat = latitude;
    }
    if (longitude < minLng) {
      minLng = longitude;
    }
    if (longitude > maxLng) {
      maxLng = longitude;
    }
  }

  // Adjust bounds with padding
  if (paddingMeters > 0) {
    const EARTH_RADIUS = 6371000; // Earth's radius in meters

    const paddingLat = (paddingMeters / EARTH_RADIUS) * (180 / Math.PI);
    const paddingLng =
      paddingLat / Math.cos(((minLat + maxLat) / 2) * (Math.PI / 180));

    minLat -= paddingLat;
    maxLat += paddingLat;
    minLng -= paddingLng;
    maxLng += paddingLng;
  }

  return { minLat, maxLat, minLng, maxLng };
};
