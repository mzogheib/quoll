import React from "react";
import { View } from "react-native";
import { TimelineEntry } from "@quoll/lib/modules";

import styles from "./styles";

import { OriginalAspectRatioImage } from "@components/OriginalAspectRatioImage";

type Props = {
  entry: TimelineEntry;
};

const EntryDetail = ({ entry }: Props) => {
  const { mediaUri } = entry;

  console.log({ entry });
  return (
    <View style={styles.wrapper}>
      {mediaUri && (
        <OriginalAspectRatioImage source={{ uri: mediaUri }} width={325} />
      )}
    </View>
  );
};

export default EntryDetail;
