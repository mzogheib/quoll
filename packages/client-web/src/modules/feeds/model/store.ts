import { FeedName } from "../types";
import { makeStore } from "store/factory";

export type FeedState = {
  name: FeedName;
  isAuthenticating: boolean;
  isConnected: boolean;
};

export type FeedsState = Record<FeedName, FeedState>;

const makeDefaultFeedState = (name: FeedName) => ({
  name,
  isAuthenticating: false,
  isConnected: false,
});

const defaultState: FeedsState = {
  [FeedName.Moves]: makeDefaultFeedState(FeedName.Moves),
  [FeedName.Strava]: makeDefaultFeedState(FeedName.Strava),
  [FeedName.Uber]: makeDefaultFeedState(FeedName.Uber),
  [FeedName.Toshl]: makeDefaultFeedState(FeedName.Toshl),
};

const { reducer, useStore } = makeStore<FeedsState>("feeds", defaultState);

export default reducer;

export const useFeedsStore = useStore;
