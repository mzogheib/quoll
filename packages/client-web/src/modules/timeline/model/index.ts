import { TimelineState, makeTimelineModel } from "@quoll/client-lib/modules";

import { useTimelineService } from "../service";
import { RootState } from "store";
import { makeReduxStoreSlice } from "@quoll/client-lib/store";

const defaultState: TimelineState = {
  isFetching: false,
  entries: null,
};

export const timelineStore = makeReduxStoreSlice<TimelineState, RootState>(
  "timeline",
  defaultState,
);

export const useTimelineModel = (getAccessToken: () => Promise<string>) => {
  const store = timelineStore.useStore();
  const service = useTimelineService(getAccessToken);

  return makeTimelineModel(store, service);
};
