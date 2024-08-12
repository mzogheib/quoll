import { FeedsState, useFeedsModel as _useFeedsModel } from "@quoll/client-lib";
import { FeedName } from "@quoll/lib";

import { makeStore } from "@utils/store";
import { useFeedsService } from "../service";

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

const useStore = makeStore(defaultState);

export const useFeedsModel = (getAccessToken: () => Promise<string>) => {
  const feedsService = useFeedsService(getAccessToken);
  return _useFeedsModel(useStore, feedsService);
};
