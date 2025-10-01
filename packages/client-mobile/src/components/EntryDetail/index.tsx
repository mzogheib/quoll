import React from "react";
import { Text, View } from "react-native";
import { TimelineEntry } from "@quoll/lib/modules";

import styles from "./styles";

import { OriginalAspectRatioImage } from "@components/OriginalAspectRatioImage";

type Props = {
  entry: TimelineEntry;
};

const EntryDetail = ({ entry }: Props) => {
  const { mediaUri, description } = entry;
  const contentWidth = styles.wrapper.maxWidth - 2 * styles.wrapper.padding;

  return (
    <View style={styles.wrapper}>
      {mediaUri && (
        <OriginalAspectRatioImage
          source={{ uri: mediaUri }}
          width={contentWidth}
          maxHeight={400}
        />
      )}
      {description && (
        <Text style={{ maxWidth: contentWidth }}>{description}</Text>
      )}
    </View>
  );
};

export default EntryDetail;
