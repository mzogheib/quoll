import {
  FeedsState,
  makeFeedsModel,
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
  const store = feedsStore.useStore();
  const feedsService = useFeedsService(getAccessToken);
  return makeFeedsModel(store, feedsService);
};
