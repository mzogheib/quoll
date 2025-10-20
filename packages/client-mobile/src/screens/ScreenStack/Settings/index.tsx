import React, { useState } from "react";
import { Text, View } from "react-native";
import { FeedName } from "@quoll/lib/modules";

import styles from "./styles";

import { ScreenProps } from "../../config";
import ScreenTemplate from "../../ScreenTemplate";
import FeedSettings from "@components/FeedSettings";
import { useMediaViewModel } from "@modules/media/view-model";
import { useGeolocationViewModel } from "@modules/geolocation/view-model";
import FeedLogo from "@components/FeedLogo";
import { useFeedsViewModel } from "@modules/feeds/view-model";
import TokenModal from "@modules/feeds/views/TokenModal";

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

const toshlFeedSettings = {
  title: "Toshl",
  imageConnected: <FeedLogo name="toshl" size={35} />,
  imageDisconnected: <FeedLogo name="toshl" size={35} isGrayscale />,
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
  const feedsViewModel = useFeedsViewModel();

  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const openTokenModal = () => setIsTokenModalOpen(true);
  const closeTokenModal = () => setIsTokenModalOpen(false);

  const stravaFeed = feedsViewModel.feeds.find(
    (feed) => feed.name === "strava",
  );
  const toshlFeed = feedsViewModel.feeds.find((feed) => feed.name === "toshl");

  if (stravaFeed === undefined) throw new Error("strava feed not found");
  if (toshlFeed === undefined) throw new Error("toshl feed not found");

  const handleFeedConnect = (name: FeedName) => async () => {
    try {
      const config = await feedsViewModel.connect(name);

      if (config.type === "oauth") {
        const { url } = config.data;

        console.log("OAuth URL:", url);

        // TODO: Open in-app browser with url
        return;
      }

      if (config.type === "personal-token") {
        openTokenModal();
        return;
      }
    } catch {
      // TODO: do something...
    }
  };

  const handleTokenSubmit = async (value: string) => {
    try {
      await feedsViewModel.authenticate("toshl", value);
      closeTokenModal();
    } catch {
      // TODO: do something...
    }
  };

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
      isConnected: stravaFeed.isConnected,
      isConnecting: stravaFeed.isAuthenticating,
      onConnect: handleFeedConnect("strava"),
      onDisconnect: () => feedsViewModel.disconnect("strava"),
    },
    {
      ...toshlFeedSettings,
      isConnected: toshlFeed.isConnected,
      isConnecting: toshlFeed.isAuthenticating,
      onConnect: handleFeedConnect("toshl"),
      onDisconnect: () => feedsViewModel.disconnect("toshl"),
    },
  ];

  return (
    <>
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
      <TokenModal
        isOpen={isTokenModalOpen}
        onCancel={closeTokenModal}
        onSubmit={handleTokenSubmit}
      />
    </>
  );
};

export default SettingsScreen;
