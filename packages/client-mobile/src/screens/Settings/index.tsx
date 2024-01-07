import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

import { ScreenProps } from "../types";
import ScreenTemplate from "../ScreenTemplate";

const SettingsScreen = (_: ScreenProps<"settings">) => {
  return (
    <ScreenTemplate>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Feeds</Text>
      </View>
    </ScreenTemplate>
  );
};

export default SettingsScreen;
