import { useState, useEffect } from "react";

interface Props {
  options: google.maps.InfoWindowOptions;
  map: google.maps.Map;
}

const InfoWindow = ({ options, map }: Props) => {
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();

  useEffect(() => {
    if (!infoWindow) setInfoWindow(new google.maps.InfoWindow());

    return () => {
      if (infoWindow) infoWindow.close();
    };
  }, [infoWindow]);

  useEffect(() => {
    if (infoWindow) {
      infoWindow.setOptions(options);
      infoWindow.open(map);
    }
  }, [infoWindow, map, options]);

  return null;
};

export default InfoWindow;
