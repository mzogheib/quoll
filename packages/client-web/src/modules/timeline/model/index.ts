import {
  TimelineState,
  makeReduxStoreSlice,
  makeTimelineModel,
} from "@quoll/client-lib";

import { useTimelineService } from "../service";
import { RootState } from "store";

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
