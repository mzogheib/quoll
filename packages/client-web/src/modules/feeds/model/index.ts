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

  const updateFeed = useCallback(
    (feedName: FeedName, newValue: Partial<FeedState>) => {
      const newFeed = {
        ...feeds[feedName],
        ...newValue,
      };

      setProperty(feedName, newFeed);
    },
    [feeds, setProperty],
  );

  const setConnected = useCallback(
    (name: FeedName, value: boolean) => {
      updateFeed(name, { isConnected: value });
    },
    [updateFeed],
  );

  const connect = useCallback(
    async (name: FeedName) => {
      updateFeed(name, { isAuthenticating: true });
      const url = await feedsService.getOauthUrl(name);
      updateFeed(name, { isAuthenticating: false });

      return url;
    },
    [updateFeed],
  );

  const disconnect = useCallback(
    async (name: FeedName) => {
      updateFeed(name, { isAuthenticating: true });
      // BE may return a message for further, manual instructions
      const message = await feedsService.deauthorize(name);
      updateFeed(name, { isConnected: false, isAuthenticating: false });

      return message;
    },
    [updateFeed],
  );

  const authenticate = useCallback(
    async (name: FeedName, code: string) => {
      updateFeed(name, { isAuthenticating: true });
      await feedsService.authenticate(name, { code });
      updateFeed(name, { isConnected: true, isAuthenticating: false });
    },
    [updateFeed],
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
