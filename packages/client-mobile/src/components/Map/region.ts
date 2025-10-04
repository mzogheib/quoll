import { Region } from "react-native-maps";
import { useEffect, useState } from "react";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";

import { useGeolocationViewModel } from "@modules/geolocation/view-model";
import { MarkerProps } from "./types";
import { usePrevious } from "@utils/hooks";

type Bounds = {
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
const findBounds = (points: Position[], paddingMeters: number = 0): Bounds => {
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

/**
 * Calculate the center of a given rectangular bounds
 *
 * Solution from ChatGPT on 2023-05-22
 * https://chat.openai.com/c/b2350c2b-4feb-4a1c-9853-8d1ad6c240b7
 *
 * @param bounds The rectangular bounds
 * @returns
 */
const findCenter = (bounds: Bounds): Position => {
  const centerLat = (bounds.minLat + bounds.maxLat) / 2;
  const centerLng = (bounds.minLng + bounds.maxLng) / 2;

  return [centerLng, centerLat];
};

/**
 * Make a region that covers an array of points. Return `null` if the input
 * array's length is 0.
 */
const makeRegion = (points: Position[]) => {
  if (points.length === 0) return null;

  const bounds = findBounds(points, 500);

  const { minLat, minLng, maxLat, maxLng } = bounds;

  const centre = findCenter(bounds);

  return {
    latitude: centre[1],
    longitude: centre[0],
    latitudeDelta: maxLat - minLat,
    longitudeDelta: maxLng - minLng,
  };
};

// TODO: cycle through different world locations
// Centre of Australia
const defaultCoords = {
  latitude: -25.898716,
  longitude: 133.843298,
};

/**
 * Calculates the region to display on the map. Region precedence is:
 * 1. Center (if provided)
 * 1. Markers
 * 1. User's location
 * 1. Default location
 *
 * @returns region The region to display on the map.
 */
export const useRegion = (params: {
  center?: Position;
  markers: MarkerProps[] | null;
}) => {
  const { center, markers } = params;

  const {
    value: coords,
    isConnected,
    isCheckingPermission,
    refresh,
  } = useGeolocationViewModel();

  const markersRegion =
    markers !== null
      ? makeRegion(markers.map((marker) => marker.coordinate))
      : null;

  const userRegion =
    isConnected && coords
      ? {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }
      : null;

  const defaultRegion = {
    latitude: defaultCoords.latitude,
    longitude: defaultCoords.longitude,
    latitudeDelta: 50,
    longitudeDelta: 50,
  };

  // This is the initial region when a new set of markers is provided
  const initialRegion = markersRegion ?? userRegion ?? defaultRegion;

  const [region, setRegion] = useState<Region>(initialRegion);

  // If any of the region inputs change, update the current region
  const prevRegion = usePrevious(initialRegion);
  useEffect(() => {
    if (
      initialRegion.latitude === prevRegion?.latitude &&
      initialRegion.longitude === prevRegion?.longitude
    ) {
      return;
    }

    setRegion(initialRegion);
  }, [center, prevRegion, initialRegion]);

  // If a center is provided, override the region with this one
  useEffect(() => {
    if (center === undefined) return;

    // Set 0 deltas to maintain the current zoom level
    // This doesn't seem to be documented behaviour but works in practice
    setRegion({
      latitude: center[1],
      longitude: center[0],
      latitudeDelta: 0,
      longitudeDelta: 0,
    });
  }, [center]);

  useEffect(() => {
    if (isCheckingPermission) return;

    if (isConnected) refresh();
  }, [isCheckingPermission, isConnected, refresh]);

  return { region };
};
