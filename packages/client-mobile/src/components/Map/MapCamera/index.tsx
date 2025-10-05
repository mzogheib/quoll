import React, { useEffect, useMemo, useRef } from "react";
import { Camera } from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";

import { MarkerProps } from "../types";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";

// TODO: cycle through different world locations
// Centre of Australia
const defaultCenter: Position = [133.843298, -25.898716];

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

  const userCenter: Position | null =
    isConnected && coords ? [coords.longitude, coords.latitude] : null;

  const markersCenter: Position | undefined = useMemo(() => {
    if (markers === null || markers.length === 0) return undefined;

    const totalLng = markers.reduce(
      (sum, marker) => sum + marker.coordinate[0],
      0,
    );
    const totalLat = markers.reduce(
      (sum, marker) => sum + marker.coordinate[1],
      0,
    );

    const centerLng = totalLng / markers.length;
    const centerLat = totalLat / markers.length;

    return [centerLng, centerLat];
  }, [markers]);

  const initialCenter: Position = markersCenter ?? userCenter ?? defaultCenter;

  // Smooth transition to new initial center when it changes
  const initialCenterLng = initialCenter?.[0];
  const initialCenterLat = initialCenter?.[1];
  useEffect(() => {
    if (
      cameraRef.current === null ||
      initialCenterLng === undefined ||
      initialCenterLat === undefined
    ) {
      return;
    }

    cameraRef.current.setCamera({
      centerCoordinate: [initialCenterLng, initialCenterLat],
    });
  }, [initialCenterLng, initialCenterLat]);

  // Smooth transition to new center when it changes
  useEffect(() => {
    if (cameraRef.current === null || center === undefined) return;

    cameraRef.current.setCamera({
      centerCoordinate: center,
    });
  }, [center]);

  return <Camera ref={cameraRef} />;
};
