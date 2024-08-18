import { FeedsState, makeFeedsModel } from "@quoll/client-lib";
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
  const store = useStore();
  const feedsService = useFeedsService(getAccessToken);
  return makeFeedsModel(store, feedsService);
};
