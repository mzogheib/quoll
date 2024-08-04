import {
  TimelineState,
  makeReduxStoreSlice,
  useTimelineModel as _useTimelineMode,
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
  const timelineService = useTimelineService(getAccessToken);
  return _useTimelineMode(timelineStore.useStore, timelineService);
};
