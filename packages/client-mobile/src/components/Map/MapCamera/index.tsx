import React, { useEffect, useMemo, useRef } from "react";
import { Camera, CameraBounds } from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";

import { MarkerProps } from "../types";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";
import { findBounds } from "./utils";

// TODO: cycle through different world locations
// Centre of Australia
const defaultBounds: CameraBounds = {
  ne: [133.843298, -25.898716],
  sw: [133.843298, -25.898716],
};

type Props = {
  /** If specified, the camera will center on this position. */
  center?: Position;
  /** The markers to contain within the camera view. */
  markers: MarkerProps[] | null;
};

/**
 * Transitions the map camera to follow the markers, user location or a given
 * center position.
 *
 * The order of precedence is:
 * 1. Given center position
 * 2. Markers bounds
 * 3. User location
 * 4. Default bounds
 */
export const MapCamera = ({ center, markers }: Props) => {
  const cameraRef = useRef<Camera>(null);

  const {
    value: coords,
    isConnected,
    isCheckingPermission,
    refresh,
  } = useGeolocationViewModel();

  useEffect(() => {
    if (isCheckingPermission) return;

    if (isConnected) refresh();
  }, [isCheckingPermission, isConnected, refresh]);

  // Not really a bounds but building it as such for consistency
  const userBounds: CameraBounds | undefined = useMemo(() => {
    if (!isConnected || !coords) return undefined;

    return {
      ne: [coords.longitude, coords.latitude],
      sw: [coords.longitude, coords.latitude],
    };
  }, [isConnected, coords]);

  const markersBounds = useMemo(() => {
    if (markers === null || markers.length === 0) return undefined;

    return findBounds(markers.map((marker) => marker.coordinate));
  }, [markers]);

  const initialBounds = markersBounds ?? userBounds ?? defaultBounds;

  // Smooth transition to new initial bounds when it changes
  const initialMinLng = initialBounds.sw[0];
  const initialMinLat = initialBounds.sw[1];
  const initialMaxLng = initialBounds.ne[0];
  const initialMaxLat = initialBounds.ne[1];
  useEffect(() => {
    if (cameraRef.current === null) return;

    cameraRef.current.setCamera({
      bounds: {
        ne: [initialMaxLng, initialMaxLat],
        sw: [initialMinLng, initialMinLat],
      },
      padding: {
        paddingTop: 50,
        paddingRight: 50,
        paddingBottom: 50,
        paddingLeft: 50,
      },
      animationDuration: 500,
    });
  }, [initialMinLng, initialMinLat, initialMaxLng, initialMaxLat]);

  // Smooth transition to new center when it changes
  useEffect(() => {
    if (cameraRef.current === null || center === undefined) return;

    // By changing only the centerCoordinate, we maintain the current zoom
    cameraRef.current.setCamera({
      centerCoordinate: center,
    });
  }, [center]);

  return <Camera ref={cameraRef} />;
};
