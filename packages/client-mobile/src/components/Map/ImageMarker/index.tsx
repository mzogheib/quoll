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

// A delay (via `setTimeout`) is added after calling `showCallout` as a
// workaround to a visual bug.
//
// The bug:
// - When an entry is selected via the timeline the callout is displayed
//   immediately.
// - If the callout is partially off screen, the map will pan until there is
//   enough space to display it. The callout remains displayed during the pan.
// - When the map finishes panning, the callout is hidden and then displayed
//   again.
//
// So the workaround is to give the map time to finish panning before displaying
// the callout via opacity.

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
