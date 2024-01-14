import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colorPalette } from "@quoll/ui-primitives";

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
            <FeedSettings
              title="Photos"
              isConnected={media.isPermitted}
              imageConnected={
                <Icon
                  name="image"
                  size={60}
                  color={colorPalette.mediumAquamarine}
                />
              }
              imageDisconnected={
                <Icon name="image" size={60} color={colorPalette.matterhorn} />
              }
              onConnect={media.requestPermission}
              onDisconnect={media.revokePermission}
            />
          </View>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default SettingsScreen;
