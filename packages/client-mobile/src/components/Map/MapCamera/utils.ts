import { CameraBounds } from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";

/**
 * Calculates the camera bounds for a given array of positions.
 *
 * @param positions The array of positions.
 * @returns the bounds containing all the given positions.
 */
export const getCameraBounds = (positions: Position[]): CameraBounds => {
  let minLat = Number.POSITIVE_INFINITY;
  let maxLat = Number.NEGATIVE_INFINITY;
  let minLng = Number.POSITIVE_INFINITY;
  let maxLng = Number.NEGATIVE_INFINITY;

  for (const position of positions) {
    const [longitude, latitude] = position;
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

  return { ne: [maxLng, maxLat], sw: [minLng, minLat] };
};
