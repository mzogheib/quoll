import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import styles from "./styles";

import { screenConfigMap } from "../config";
import { ScreenName } from "../config";

type Props = {
  children: ReactNode;
};

const ScreenTemplate = ({ children }: Props) => {
  const route = useRoute();

  const currentScreen = screenConfigMap[route.name as ScreenName];

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>{currentScreen.title}</Text>
      </View>
      {children}
    </View>
  );
};

export default ScreenTemplate;
