import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

import { ScreenProps } from "../types";
import ScreenTemplate from "../ScreenTemplate";
import FeedSettings from "@components/FeedSettings";
import { useMedia } from "@modules/media/logic";

const SettingsScreen = (_: ScreenProps<"settings">) => {
  const media = useMedia();

  console.log(media.isPermitted);

  return (
    <ScreenTemplate>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.title}>Feeds</Text>
          <View style={styles.feedSettingsWrapper}>
            <FeedSettings title="Photos" onConnect={media.requestPermission} />
          </View>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default SettingsScreen;
