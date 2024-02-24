import { FeedState, makeReduxStoreSlice } from "@quoll/client-lib";
import { FeedName } from "@quoll/lib";

import { RootState } from "store";

export type State = Record<FeedName, FeedState>;

const makeDefaultFeedState = (name: FeedName) => ({
  name,
  isAuthenticating: false,
  isConnected: false,
});

const defaultState: State = {
  moves: makeDefaultFeedState("moves"),
  strava: makeDefaultFeedState("strava"),
  uber: makeDefaultFeedState("uber"),
  toshl: makeDefaultFeedState("toshl"),
  media: makeDefaultFeedState("media"),
};

export const { reducer, useStore } = makeReduxStoreSlice<State, RootState>(
  "feeds",
  defaultState,
);
