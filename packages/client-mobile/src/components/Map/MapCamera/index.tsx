import React, { useEffect, useMemo, useRef } from "react";
import { Camera } from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";

import { MarkerProps } from "../types";

type Props = {
  center?: Position;
  markers: MarkerProps[] | null;
};

export const MapCamera = ({ center, markers }: Props) => {
  const cameraRef = useRef<Camera>(null);

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

  // Smooth transition to new markers center when it changes
  const markersCenterLng = markersCenter?.[0];
  const markersCenterLat = markersCenter?.[1];
  useEffect(() => {
    if (
      cameraRef.current === null ||
      markersCenterLng === undefined ||
      markersCenterLat === undefined
    ) {
      return;
    }

    cameraRef.current.setCamera({
      centerCoordinate: [markersCenterLng, markersCenterLat],
    });
  }, [markersCenterLng, markersCenterLat]);

  // Smooth transition to new center when it changes
  useEffect(() => {
    if (cameraRef.current === null || center === undefined) return;

    cameraRef.current.setCamera({
      centerCoordinate: center,
    });
  }, [center]);

  return <Camera ref={cameraRef} />;
};
