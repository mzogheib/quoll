import { ISO8601Date, TimelineEntry } from "@quoll/lib";

import { Store } from "../../../store/types";
import { TimelineService } from "../service";

export type TimelineState = {
  /**
   * Whether the timeline is currently being fetched.
   */
  isFetching: boolean;

  /**
   * The array of timeline entries.
   */
  entries: TimelineEntry[] | null;
};

type TimelineActions = {
  /**
   * @param date the date formatted as `YYYY-MM-DD`.
   */
  fetchTimeline: (date: ISO8601Date) => void;

  /**
   * Resets the model to its initial state
   */
  reset: () => void;
};

type TimelineModel = TimelineState & TimelineActions;

export const useTimelineModel = (
  useStore: () => Store<TimelineState>,
  timelineService: TimelineService,
): TimelineModel => {
  const { state, setProperty, reset } = useStore();

  const fetchTimeline = async (date: ISO8601Date) => {
    setProperty("isFetching", true);
    try {
      const newEntries = await timelineService.get(date);
      setProperty("entries", newEntries);
    } finally {
      setProperty("isFetching", false);
    }
  };

  return {
    ...state,
    fetchTimeline,
    reset,
  };
};
