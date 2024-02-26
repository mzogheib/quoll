import { OriginalAspectRatioImage } from "@components/OriginalAspectRatioImage";
import { useEffect, useRef } from "react";
import { ImageURISource } from "react-native";
import { MapMarkerProps, Marker, Callout, MapMarker } from "react-native-maps";

export type Props = {
  id: string;
  image: ImageURISource;
  coordinate: MapMarkerProps["coordinate"];
};

const ImageMarker = ({ id, image, coordinate }: Props) => {
  const markerRef = useRef<MapMarker>(null);

  useEffect(() => {
    return () => {
      markerRef.current?.hideCallout();
    };
  }, []);

  return (
    <Marker ref={markerRef} identifier={id} coordinate={coordinate}>
      <OriginalAspectRatioImage source={image} width={40} height={40} />
      <Callout>
        <OriginalAspectRatioImage source={image} width={325} />
      </Callout>
    </Marker>
  );
};

export default ImageMarker;
