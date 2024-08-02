import {
  TimelineState,
  useTimelineModel as _useTimelineMode,
} from "@quoll/client-lib/modules";
import { makeReduxStoreSlice } from "@quoll/client-lib/store";

import timelineService from "../service";
import { RootState } from "store";

const defaultState: TimelineState = {
  isFetching: false,
  entries: null,
};

export const timelineStore = makeReduxStoreSlice<TimelineState, RootState>(
  "timeline",
  defaultState,
);

export const useTimelineModel = () =>
  _useTimelineMode(timelineStore.useStore, timelineService);
