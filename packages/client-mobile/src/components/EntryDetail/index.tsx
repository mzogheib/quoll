import React from "react";
import { Text, View } from "react-native";
import { TimelineEntry } from "@quoll/lib/modules";

import styles from "./styles";

import { OriginalAspectRatioImage } from "@components/OriginalAspectRatioImage";
import TouchableIcon from "@components/TouchableIcon";

type Props = {
  entry: TimelineEntry;
  onClose: () => void;
  onClickPrev: () => void;
  onClickNext: () => void;
};

const EntryDetail = ({ entry, onClose, onClickPrev, onClickNext }: Props) => {
  const { mediaUri, description, title } = entry;
  const contentWidth = styles.wrapper.maxWidth - 2 * styles.wrapper.padding;

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableIcon name="close" onPress={onClose} />
      </View>
      <View style={styles.main}>
        <View style={styles.navigateAction}>
          <TouchableIcon name="navigate-before" onPress={onClickPrev} />
        </View>
        <View style={styles.content}>
          {mediaUri && (
            <OriginalAspectRatioImage
              source={{ uri: mediaUri }}
              width={contentWidth}
              maxHeight={200}
            />
          )}
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        <View style={styles.navigateAction}>
          <TouchableIcon name="navigate-next" onPress={onClickNext} />
        </View>
      </View>
    </View>
  );
};

export default EntryDetail;
