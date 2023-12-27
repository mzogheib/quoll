import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";

import styles from "./styles";

import { screenConfigMap } from "../config";
import { ScreenName } from "../types";

type Props = {
  children: ReactNode;
};

const ScreenTemplate = ({ children }: Props) => {
  const route = useRoute();

  const currentScreen = screenConfigMap[route.name as ScreenName];

  return (
    <View style={styles.wrapper}>
      <View>
        <Text>{currentScreen.title}</Text>
      </View>
      {children}
    </View>
  );
};

export default ScreenTemplate;
