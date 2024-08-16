import { FeedConnectionConfig, FeedName } from "@quoll/lib";

import { Store } from "../../../store";
import { FeedsService } from "../service";

export type FeedState = {
  name: FeedName;
  isAuthenticating: boolean;
  isConnected: boolean;
};

export type FeedsState = Record<FeedName, FeedState>;

type FeedsModel = {
  feeds: FeedState[];
  isOneConnected: boolean;
  connect: (name: FeedName) => Promise<FeedConnectionConfig>;
  disconnect: (name: FeedName) => Promise<void>;
  authenticate: (name: FeedName, code: string) => Promise<void>;
  setConnected: (name: FeedName, value: boolean) => void;
  reset: () => void;
};

export const useFeedsModel = (
  useStore: () => Store<FeedsState>,
  feedsService: FeedsService,
): FeedsModel => {
  const { setProperty, state: feeds, reset } = useStore();

  const isOneConnected = Object.values(feeds).some((feed) => feed.isConnected);

  const updateFeed = (feedName: FeedName, newValue: Partial<FeedState>) => {
    const newFeed = {
      ...feeds[feedName],
      ...newValue,
    };

    setProperty(feedName, newFeed);
  };

  const setConnected = (name: FeedName, value: boolean) => {
    updateFeed(name, { isConnected: value });
  };

  const connect = async (name: FeedName) => {
    try {
      updateFeed(name, { isAuthenticating: true });
      const config = await feedsService.connect(name);

      return config;
    } catch (error) {
      throw error;
    } finally {
      updateFeed(name, { isAuthenticating: false });
    }
  };

  const disconnect = async (name: FeedName) => {
    try {
      updateFeed(name, { isAuthenticating: true });
      await feedsService.deauthorize(name);
      updateFeed(name, { isConnected: false, isAuthenticating: false });
    } catch (error) {
      updateFeed(name, { isConnected: true, isAuthenticating: false });
      throw error;
    }
  };

  const authenticate = async (name: FeedName, code: string) => {
    updateFeed(name, { isAuthenticating: true });
    await feedsService.authenticate(name, { code });
    updateFeed(name, { isConnected: true, isAuthenticating: false });
  };

  return {
    feeds: Object.values(feeds),
    isOneConnected,
    connect,
    disconnect,
    authenticate,
    setConnected,
    reset,
  };
};
