import {
  FeedsState,
  useFeedsModel as _useFeedsModel,
  makeReduxStoreSlice,
} from "@quoll/client-lib";
import { FeedName } from "@quoll/lib";

import { useFeedsService } from "../service";
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

export const useFeedsModel = (getAccessToken: () => Promise<string>) => {
  const feedsService = useFeedsService(getAccessToken);
  return _useFeedsModel(feedsStore.useStore, feedsService);
};
