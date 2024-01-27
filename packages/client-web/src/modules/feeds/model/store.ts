import { makeStore } from "@quoll/client-lib";

import { RootState } from "store";
import { FeedName } from "../types";

export type FeedState = {
  name: FeedName;
  isAuthenticating: boolean;
  isConnected: boolean;
};

export type State = Record<FeedName, FeedState>;

const makeDefaultFeedState = (name: FeedName) => ({
  name,
  isAuthenticating: false,
  isConnected: false,
});

const defaultState: State = {
  [FeedName.Moves]: makeDefaultFeedState(FeedName.Moves),
  [FeedName.Strava]: makeDefaultFeedState(FeedName.Strava),
  [FeedName.Uber]: makeDefaultFeedState(FeedName.Uber),
  [FeedName.Toshl]: makeDefaultFeedState(FeedName.Toshl),
};

export const { reducer, useStore } = makeStore<State, RootState>(
  "feeds",
  defaultState,
);
