import { useState, useEffect } from "react";

interface Props {
  options: google.maps.MarkerOptions;
  map: google.maps.Map;
  onClick?: (event: google.maps.MapMouseEvent) => void;
}

const Marker = ({ options, map, onClick }: Props) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) setMarker(new google.maps.Marker());

    return () => {
      if (marker) marker.setMap(null);
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
      if (onClick) marker.addListener("click", onClick);
      marker.setMap(map);
    }
  }, [marker, options, map, onClick]);

  return null;
};

export default Marker;
