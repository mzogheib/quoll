import {
  TimelineState,
  useTimelineModel as _useTimelineMode,
} from "@quoll/client-lib";

import { makeStore } from "@utils/store";
import timelineService from "../service";

const defaultState: TimelineState = {
  isFetching: false,
  entries: [],
};

const useTimelineStore = makeStore(defaultState);

export const useTimelineModel = () =>
  _useTimelineMode(useTimelineStore, timelineService);
