import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

import { ScreenProps } from "../types";
import ScreenTemplate from "../ScreenTemplate";
import FeedSettings from "@components/FeedSettings";
import { connectToMedia } from "@modules/media/logic";

const SettingsScreen = (_: ScreenProps<"settings">) => {
  return (
    <ScreenTemplate>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.title}>Feeds</Text>
          <View style={styles.feedSettingsWrapper}>
            <FeedSettings title="Photos" onConnect={connectToMedia} />
          </View>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default SettingsScreen;
