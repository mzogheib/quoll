import {
  FeedsState,
  useFeedsModel as _useFeedsModel,
} from "@quoll/client-lib/modules";
import { makeReduxStoreSlice } from "@quoll/client-lib/store";
import { FeedName } from "@quoll/lib";

import feedsService from "../service";
import { RootState } from "store";

const makeDefaultFeedState = (name: FeedName) => ({
  name,
  isAuthenticating: false,
  isConnected: false,
});

const defaultState: FeedsState = {
  strava: makeDefaultFeedState("strava"),
  toshl: makeDefaultFeedState("toshl"),
  media: makeDefaultFeedState("media"),
};

export const feedsStore = makeReduxStoreSlice<FeedsState, RootState>(
  "feeds",
  defaultState,
);

export const useFeedsModel = () =>
  _useFeedsModel(feedsStore.useStore, feedsService);
