import { OriginalAspectRatioImage } from "@components/OriginalAspectRatioImage";
import { useFocussedEntryViewModel } from "@modules/focussedEntry/view-model";
import { useEffect, useRef } from "react";
import { ImageURISource } from "react-native";
import { MapMarkerProps, Marker, Callout, MapMarker } from "react-native-maps";

export type Props = {
  id: string;
  image: ImageURISource;
  coordinate: MapMarkerProps["coordinate"];
};

const ImageMarker = ({ id, image, coordinate }: Props) => {
  const { focussedEntryId, setFocussedEntryId } = useFocussedEntryViewModel();

  const markerRef = useRef<MapMarker>(null);

  useEffect(() => {
    if (id === focussedEntryId) {
      markerRef.current?.showCallout();
    }
  }, [id, focussedEntryId]);

  useEffect(() => {
    return () => {
      markerRef.current?.hideCallout();
    };
  }, []);

  return (
    <Marker
      ref={markerRef}
      identifier={id}
      coordinate={coordinate}
      onPress={() => setFocussedEntryId(id)}
    >
      <OriginalAspectRatioImage source={image} width={40} height={40} />
      <Callout>
        <OriginalAspectRatioImage source={image} width={325} />
      </Callout>
    </Marker>
  );
};

export default ImageMarker;
