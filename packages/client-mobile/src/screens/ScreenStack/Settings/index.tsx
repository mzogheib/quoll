import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colorPalette } from "@quoll/ui-primitives";

import styles from "./styles";

import { ScreenProps } from "../../config";
import ScreenTemplate from "../../ScreenTemplate";
import FeedSettings from "@components/FeedSettings";
import { useMediaViewModel } from "@modules/media/view-model";
import { useGeolocation } from "@modules/geolocation/logic";

const renderIcon = (name: string, color: string) => (
  <Icon name={name} size={35} color={color} />
);

const photosFeedSettings = {
  title: "Photos",
  imageConnected: renderIcon("image", colorPalette.mediumAquamarine),
  imageDisconnected: renderIcon("image", colorPalette.matterhorn),
};

const locationSettings = {
  title: "Current location",
  connectLabel: "Enable",
  disconnectLabel: "Disable",
  imageConnected: renderIcon("my-location", colorPalette.mediumAquamarine),
  imageDisconnected: renderIcon("my-location", colorPalette.matterhorn),
};

const SettingsScreen = ({ route }: ScreenProps<"settings">) => {
  const mediaViewModel = useMediaViewModel();
  const geolocation = useGeolocation();

  const feeds = [
    {
      ...photosFeedSettings,
      isConnected: mediaViewModel.isConnected,
      isConnecting: mediaViewModel.isConnecting,
      onConnect: mediaViewModel.connect,
      onDisconnect: mediaViewModel.disconnect,
    },
  ];

  return (
    <ScreenTemplate screenName={route.name}>
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
              isConnected={geolocation.isConnected}
              isConnecting={geolocation.isConnecting}
              onConnect={geolocation.connect}
              onDisconnect={geolocation.disconnect}
            />
          </View>
        </View>
      </View>
    </ScreenTemplate>
  );
};

export default SettingsScreen;
