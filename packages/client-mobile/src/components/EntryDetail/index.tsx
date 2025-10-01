import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

import { TimelineEntry } from "@quoll/lib/modules";

type Props = {
  entry: TimelineEntry;
};

const EntryDetail = ({ entry }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text>{entry.title}</Text>
    </View>
  );
};

export default EntryDetail;
