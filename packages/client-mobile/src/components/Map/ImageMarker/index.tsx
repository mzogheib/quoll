import { ImageURISource, View } from "react-native";
import { MapMarkerProps, Marker, Callout, MapMarker } from "react-native-maps";
import { useEffect, useRef, useState } from "react";

import { OriginalAspectRatioImage } from "@components/OriginalAspectRatioImage";
import styles from "./styles";

type Props = {
  id: string;
  image: ImageURISource;
  coordinate: MapMarkerProps["coordinate"];
  isFocussed: boolean;
  onPress: (id: string) => void;
};

// A delay (via `setTimeout`) is added after calling `showCallout`.
// Why? It's a workaround to a "double render" bug that occurs when an entry
// is selected via the timeline. When an entry is selected via the timeline
// the callout is displayed immediately, as opposed to waiting for the map to
// pan until there is enough space to display it. When the map eventually
// finishes the pan, _another_ `showCallout` event is somehow triggered.

const ImageMarker = ({ id, image, coordinate, isFocussed, onPress }: Props) => {
  const markerRef = useRef<MapMarker>(null);

  const [isCalloutReadyToDisplay, setIsCalloutReadyToDisplay] = useState(false);

  useEffect(() => {
    setIsCalloutReadyToDisplay(false);

    if (isFocussed) {
      markerRef.current?.showCallout();
      setTimeout(() => {
        setIsCalloutReadyToDisplay(true);
      }, 500);
    }
  }, [isFocussed]);

  useEffect(() => {
    return () => {
      markerRef.current?.hideCallout();
    };
  }, []);

  const calloutOpacity = isCalloutReadyToDisplay ? 1 : 0;

  return (
    <Marker
      ref={markerRef}
      identifier={id}
      coordinate={coordinate}
      // Stops the press event from reaching the Map, which deselects the entry.
      stopPropagation
      calloutOffset={{ x: 5, y: 5 }}
      onPress={() => onPress(id)}
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
