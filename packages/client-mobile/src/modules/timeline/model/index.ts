import {
  TimelineState,
  useTimelineModel as _useTimelineMode,
} from "@quoll/client-lib";

import { makeStore } from "@utils/store";
import { useTimelineService } from "../service";

const defaultState: TimelineState = {
  isFetching: false,
  entries: null,
};

const useTimelineStore = makeStore(defaultState);

export const useTimelineModel = (getAccessToken: () => Promise<string>) => {
  const service = useTimelineService(getAccessToken);

  return _useTimelineMode(useTimelineStore, service);
};
