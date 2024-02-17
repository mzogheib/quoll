import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import styles from "./styles";

import { ScreenName, screenConfigMap } from "../config";

type Props = {
  screenName: ScreenName;
  children: ReactNode;
};

const ScreenTemplate = ({ screenName, children }: Props) => (
  <View style={styles.wrapper}>
    <View style={styles.header}>
      <Text style={styles.title}>{screenConfigMap[screenName].title}</Text>
    </View>
    {children}
  </View>
);

export default ScreenTemplate;
