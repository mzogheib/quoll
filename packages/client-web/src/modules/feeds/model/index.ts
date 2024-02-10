import { useCallback, useMemo } from "react";
import { FeedName } from "@quoll/lib";

import { FeedState, useStore } from "./store";
import feedsService from "../service";

export const useFeedsModel = () => {
  const { setProperty, state: feeds } = useStore();

  const isOneConnected = useMemo(
    () => Object.values(feeds).some((feed) => feed.isConnected),
    [feeds],
  );

  const setFeedProperty = useCallback(
    <PN extends keyof FeedState>(
      feedName: FeedName,
      propertyName: PN,
      value: FeedState[PN],
    ) => {
      const newFeed = {
        ...feeds[feedName],
        [propertyName]: value,
      };

      setProperty(feedName, newFeed);
    },
    [feeds, setProperty],
  );

  const setConnected = useCallback(
    (name: FeedName, value: boolean) => {
      setFeedProperty(name, "isConnected", value);
    },
    [setFeedProperty],
  );

  const connect = useCallback(
    async (name: FeedName) => {
      setFeedProperty(name, "isAuthenticating", true);
      const url = await feedsService.getOauthUrl(name);
      setFeedProperty(name, "isAuthenticating", false);

      return url;
    },
    [setFeedProperty],
  );

  const disconnect = useCallback(
    async (name: FeedName) => {
      setFeedProperty(name, "isAuthenticating", true);
      // BE may return a message for further, manual instructions
      const message = await feedsService.deauthorize(name);
      setFeedProperty(name, "isConnected", false);
      setFeedProperty(name, "isAuthenticating", false);

      return message;
    },
    [setFeedProperty],
  );

  const authenticate = useCallback(
    async (name: FeedName, code: string) => {
      setFeedProperty(name, "isAuthenticating", true);
      await feedsService.authenticate(name, { code });
      setFeedProperty(name, "isConnected", true);
      setFeedProperty(name, "isAuthenticating", false);
    },
    [setFeedProperty],
  );

  return {
    feeds: Object.values(feeds),
    isOneConnected,
    connect,
    disconnect,
    authenticate,
    setConnected,
  };
};
