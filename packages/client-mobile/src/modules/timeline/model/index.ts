import { TimelineState, makeTimelineModel } from "@quoll/client-lib";

import { makeStore } from "@utils/store";
import { useTimelineService } from "../service";

const defaultState: TimelineState = {
  isFetching: false,
  entries: null,
};

const useStore = makeStore(defaultState);

export const useTimelineModel = (getAccessToken: () => Promise<string>) => {
  const store = useStore();
  const service = useTimelineService(getAccessToken);

  return makeTimelineModel(store, service);
};
