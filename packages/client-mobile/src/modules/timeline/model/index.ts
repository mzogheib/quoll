import {
  TimelineState,
  useTimelineModel as _useTimelineMode,
} from "@quoll/client-lib";

import timelineService from "../service";
import { makeStore } from "../../../store";

const defaultState: TimelineState = {
  isFetching: false,
  entries: [],
};

export const useTimelineStore = makeStore(defaultState);

export const useTimelineModel = () =>
  _useTimelineMode(useTimelineStore, timelineService);
