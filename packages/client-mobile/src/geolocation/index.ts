import { useEffect, useState } from "react";
import Geolocation, {
  GeolocationError,
} from "@react-native-community/geolocation";
import { Coords } from "./types";

export const useGeolocation = (initialCoords: Coords) => {
  const [coords, setCoords] = useState(initialCoords);
  const [error, setError] = useState<GeolocationError | undefined>(undefined);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => {
        setCoords(info.coords);
      },
      (error_) => {
        setError(error_);
      }
    );
  }, []);

  return {
    coords,
    error,
  };
};
