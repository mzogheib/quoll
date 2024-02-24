import { FeedsState, makeReduxStoreSlice } from "@quoll/client-lib";
import { FeedName } from "@quoll/lib";

import { RootState } from "store";

const makeDefaultFeedState = (name: FeedName) => ({
  name,
  isAuthenticating: false,
  isConnected: false,
});

const defaultState: FeedsState = {
  moves: makeDefaultFeedState("moves"),
  strava: makeDefaultFeedState("strava"),
  uber: makeDefaultFeedState("uber"),
  toshl: makeDefaultFeedState("toshl"),
  media: makeDefaultFeedState("media"),
};

export const { reducer, useStore } = makeReduxStoreSlice<FeedsState, RootState>(
  "feeds",
  defaultState,
);
