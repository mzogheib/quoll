import {
  TimelineState,
  makeReduxStoreSlice,
  useTimelineModel as _useTimelineMode,
} from "@quoll/client-lib";

import timelineService from "../service";
import { RootState } from "store";

const defaultState: TimelineState = {
  isFetching: false,
  entries: [],
};

export const timelineStore = makeReduxStoreSlice<TimelineState, RootState>(
  "timeline",
  defaultState,
);

export const useTimelineModel = () =>
  _useTimelineMode(timelineStore.useStore, timelineService);
