import { LatLng, Region } from "react-native-maps";
import { MarkerProps } from "./types";
import { useEffect } from "react";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";

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
const findBounds = (points: LatLng[], paddingMeters: number = 0): Bounds => {
  let minLat = Number.POSITIVE_INFINITY;
  let maxLat = Number.NEGATIVE_INFINITY;
  let minLng = Number.POSITIVE_INFINITY;
  let maxLng = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    if (point.latitude < minLat) {
      minLat = point.latitude;
    }
    if (point.latitude > maxLat) {
      maxLat = point.latitude;
    }
    if (point.longitude < minLng) {
      minLng = point.longitude;
    }
    if (point.longitude > maxLng) {
      maxLng = point.longitude;
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
const findCenter = (bounds: Bounds): LatLng => {
  const centerLat = (bounds.minLat + bounds.maxLat) / 2;
  const centerLng = (bounds.minLng + bounds.maxLng) / 2;

  return { latitude: centerLat, longitude: centerLng };
};

/**
 * Make a region that covers an array of points
 *
 * @param points
 * @returns
 */
const makeRegion = (points: LatLng[]) => {
  if (!points.length) return;

  const bounds = findBounds(points, 500);

  const { minLat, minLng, maxLat, maxLng } = bounds;

  const centre = findCenter(bounds);

  return {
    ...centre,
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
 * 1. Markers
 * 1. User's location
 * 1. Default location
 *
 * @returns region The region to display on the map.
 */
export const useRegion = (params: {
  markers: MarkerProps[];
}): { region: Region } => {
  const { markers } = params;

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
      : null;

  const defaultRegion = {
    latitude: defaultCoords.latitude,
    longitude: defaultCoords.longitude,
    latitudeDelta: 50,
    longitudeDelta: 50,
  };

  const region = markersRegion ?? userRegion ?? defaultRegion;

  useEffect(() => {
    if (isCheckingPermission) return;

    if (isConnected) refresh();
  }, [isCheckingPermission, isConnected, refresh]);

  return { region };
};
