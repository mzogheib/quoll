import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import InfoWindow from "../InfoWindow";
import Polyline from "../Polyline";
import Marker from "../Marker";
import { makeBounds } from "../utils";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export interface PolylineConfig {
  options: google.maps.PolylineOptions;
  onClick?: (event: google.maps.MapMouseEvent) => void;
}

export interface MarkerConfig {
  options: google.maps.MarkerOptions;
  onClick?: (event: google.maps.MapMouseEvent) => void;
}

export interface Props {
  markerConfigs?: MarkerConfig[];
  polylineConfigs?: PolylineConfig[];
  infoWindowOptions?: google.maps.InfoWindowOptions;
}

const MapComponent = ({
  markerConfigs,
  polylineConfigs,
  infoWindowOptions,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  const renderPolylines = () =>
    map &&
    polylineConfigs?.map(({ options, onClick }, i) => (
      <Polyline key={i} options={options} onClick={onClick} map={map} />
    ));

  const renderMarkers = () =>
    map &&
    markerConfigs?.map(({ options, onClick }, i) => (
      <Marker key={i} options={options} onClick={onClick} map={map} />
    ));

  // Set the map on first render with a default center
  useEffect(() => {
    if (ref.current && !map) {
      const melbourne = new google.maps.LatLng(-37.8079033, 144.9759344);
      const options = { center: melbourne, zoom: 14, mapTypeId: "roadmap" };

      setMap(new google.maps.Map(ref.current, options));
    }
  }, [ref, map]);

  // Fit map to new map items
  useEffect(() => {
    if (!map) return;

    const polylinesOptions = polylineConfigs?.map(({ options }) => options);
    const markersOptions = markerConfigs?.map(({ options }) => options);

    const bounds = makeBounds({
      polylinesOptions,
      markersOptions,
    });

    if (!bounds.isEmpty()) map.fitBounds(bounds);
  }, [map, markerConfigs, polylineConfigs]);

  return (
    <Wrapper ref={ref}>
      {renderPolylines()}
      {renderMarkers()}
      {map && infoWindowOptions && (
        <InfoWindow options={infoWindowOptions} map={map} />
      )}
    </Wrapper>
  );
};

export default MapComponent;
