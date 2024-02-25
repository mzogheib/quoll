import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

import { ScreenProps } from "../../config";
import ScreenTemplate from "../../ScreenTemplate";
import FeedSettings from "@components/FeedSettings";
import { useMediaViewModel } from "@modules/media/view-model";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";
import FeedLogo from "@components/FeedLogo";

const photosFeedSettings = {
  title: "Photos",
  imageConnected: <FeedLogo name="media" size={35} />,
  imageDisconnected: <FeedLogo name="media" size={35} isGrayscale />,
};

const stravaFeedSettings = {
  title: "Strava",
  imageConnected: <FeedLogo name="strava" size={35} />,
  imageDisconnected: <FeedLogo name="strava" size={35} isGrayscale />,
};

const locationSettings = {
  title: "Current location",
  connectLabel: "Enable",
  disconnectLabel: "Disable",
  imageConnected: <FeedLogo name="location" size={35} />,
  imageDisconnected: <FeedLogo name="location" size={35} isGrayscale />,
};

const SettingsScreen = ({ route }: ScreenProps<"settings">) => {
  const mediaViewModel = useMediaViewModel();
  const geolocation = useGeolocationViewModel();

  const feeds = [
    {
      ...photosFeedSettings,
      isConnected: mediaViewModel.isConnected,
      isConnecting: mediaViewModel.isConnecting,
      onConnect: mediaViewModel.connect,
      onDisconnect: mediaViewModel.disconnect,
    },
    {
      ...stravaFeedSettings,
      isConnected: false,
      isConnecting: false,
      onConnect: () => null,
      onDisconnect: () => null,
    },
  ];

  return (
    <ScreenTemplate screenName={route.name}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.title}>Feeds</Text>
          {feeds.map((props) => (
            <View key={props.title} style={styles.feedSettingsWrapper}>
              <FeedSettings {...props} />
            </View>
          ))}
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
