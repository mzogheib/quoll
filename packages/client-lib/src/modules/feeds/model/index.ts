import { FeedName } from "@quoll/lib";

export type FeedState = {
  name: FeedName;
  isAuthenticating: boolean;
  isConnected: boolean;
};

export type FeedsState = Record<FeedName, FeedState>;
