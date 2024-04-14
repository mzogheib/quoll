import { ImageURISource, View } from "react-native";
import { MapMarkerProps, Marker, Callout, MapMarker } from "react-native-maps";
import { useEffect, useRef, useState } from "react";

import { OriginalAspectRatioImage } from "@components/OriginalAspectRatioImage";
import { useFocussedEntryViewModel } from "@modules/focussedEntry/view-model";
import styles from "./styles";

export type Props = {
  id: string;
  image: ImageURISource;
  coordinate: MapMarkerProps["coordinate"];
};

const ImageMarker = ({ id, image, coordinate }: Props) => {
  const { focussedEntryId, setFocussedEntryId } = useFocussedEntryViewModel();

  const markerRef = useRef<MapMarker>(null);

  const [isCalloutVisible, setIsCalloutVisible] = useState(false);

  useEffect(() => {
    setIsCalloutVisible(false);

    if (id === focussedEntryId) {
      markerRef.current?.showCallout();
      setTimeout(() => {
        setIsCalloutVisible(true);
      }, 500);
    }
  }, [id, focussedEntryId]);

  useEffect(() => {
    return () => {
      markerRef.current?.hideCallout();
    };
  }, []);

  const calloutOpacity = isCalloutVisible ? 1 : 0;

  return (
    <Marker
      ref={markerRef}
      identifier={id}
      coordinate={coordinate}
      stopPropagation
      calloutOffset={{ x: 5, y: 5 }}
      onPress={() => setFocussedEntryId(id)}
    >
      <OriginalAspectRatioImage source={image} width={40} height={40} />
      <Callout style={{ opacity: calloutOpacity }} tooltip>
        <View style={styles.calloutTooltip}>
          <OriginalAspectRatioImage source={image} width={325} />
        </View>
      </Callout>
    </Marker>
  );
};

export default ImageMarker;
