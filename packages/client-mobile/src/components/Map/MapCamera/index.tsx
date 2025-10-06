import React, { useEffect, useMemo, useRef } from "react";
import { Camera } from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";

import { MarkerProps } from "../types";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";
import { Bounds, findBounds } from "../region";

// TODO: cycle through different world locations
// Centre of Australia
const defaultBounds: Bounds = {
  minLat: -25.898716,
  maxLat: -25.898716,
  minLng: 133.843298,
  maxLng: 133.843298,
};

type Props = {
  center?: Position;
  markers: MarkerProps[] | null;
};

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

  const userBounds: Bounds | undefined = useMemo(() => {
    if (!isConnected || !coords) return undefined;

    const deltaLat = 0.05;
    const deltaLng = 0.05;

    return {
      minLat: coords.latitude - deltaLat,
      maxLat: coords.latitude + deltaLat,
      minLng: coords.longitude - deltaLng,
      maxLng: coords.longitude + deltaLng,
    };
  }, [isConnected, coords]);

  const markersBounds = useMemo(() => {
    if (markers === null || markers.length === 0) return undefined;

    return findBounds(markers.map((marker) => marker.coordinate));
  }, [markers]);

  const initialBounds = markersBounds ?? userBounds ?? defaultBounds;

  // Smooth transition to new initial bounds when it changes
  const initialMinLng = initialBounds.minLng;
  const initialMinLat = initialBounds.minLat;
  const initialMaxLng = initialBounds.maxLng;
  const initialMaxLat = initialBounds.maxLat;
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
