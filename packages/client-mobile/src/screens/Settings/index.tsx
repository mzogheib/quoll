import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colorPalette } from "@quoll/ui-primitives";

import styles from "./styles";

import { ScreenProps } from "../types";
import ScreenTemplate from "../ScreenTemplate";
import FeedSettings from "@components/FeedSettings";
import { useMedia } from "@modules/media/logic";

const photosFeedSettings = {
  title: "Photos",
  url: undefined,
  imageConnected: (
    <Icon name="image" size={35} color={colorPalette.mediumAquamarine} />
  ),
  imageDisconnected: (
    <Icon name="image" size={35} color={colorPalette.matterhorn} />
  ),
};

const locationSettings = {
  title: "Current location",
  url: undefined,
  connectLabel: "Enable",
  disconnectLabel: "Disable",
  imageConnected: (
    <Icon name="my-location" size={35} color={colorPalette.mediumAquamarine} />
  ),
  imageDisconnected: (
    <Icon name="my-location" size={35} color={colorPalette.matterhorn} />
  ),
};

const SettingsScreen = (_: ScreenProps<"settings">) => {
  const media = useMedia();

  const feeds = [
    {
      ...photosFeedSettings,
      isConnected: media.isConnected,
      isConnecting: media.isConnecting,
      onConnect: media.connect,
      onDisconnect: media.disconnect,
    },
  ];

  return (
    <ScreenTemplate>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.title}>Feeds</Text>
          <View style={styles.feedSettingsWrapper}>
            {feeds.map((props) => (
              <FeedSettings key={props.title} {...props} />
            ))}
          </View>
          <Text style={styles.title}>Map</Text>
          <View style={styles.feedSettingsWrapper}>
            <FeedSettings
              {...locationSettings}
              isConnected={false}
              isConnecting={false}
              onConnect={() => {}}
              onDisconnect={() => {}}
            />
          </View>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default SettingsScreen;
