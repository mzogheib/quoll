import { OriginalAspectRatioImage } from "@components/OriginalAspectRatioImage";
import { useEffect, useRef } from "react";
import { ImageURISource } from "react-native";
import { MapMarkerProps, Marker, Callout, MapMarker } from "react-native-maps";

export type Props = {
  image: ImageURISource;
  coordinate: MapMarkerProps["coordinate"];
};

const ImageMarker = ({ image, ...rest }: Props) => {
  const markerRef = useRef<MapMarker>(null);

  useEffect(() => {
    return () => {
      markerRef.current?.hideCallout();
    };
  }, []);

  return (
    <Marker ref={markerRef} {...rest}>
      <OriginalAspectRatioImage source={image} width={40} height={40} />
      <Callout>
        <OriginalAspectRatioImage source={image} width={325} />
      </Callout>
    </Marker>
  );
};

export default ImageMarker;
