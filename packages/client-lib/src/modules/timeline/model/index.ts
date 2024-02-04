import { Store } from "../../../store/types";
import { TimelineService } from "../service";
import { TimelineEntry } from "../types";

export type TimelineState = {
  /**
   * Whether the timeline is currently being fetched.
   */
  isFetching: boolean;

  /**
   * The array of timeline entries.
   */
  entries: TimelineEntry[];
};

type TimelineActions = {
  /**
   * @param date the date formatted as `YYYY-MM-DD`.
   */
  fetchTimeline: (date: string) => void;
};

type TimelineModel = TimelineState & TimelineActions;

export const useTimelineModel = (
  useStore: () => Store<TimelineState>,
  timelineService: TimelineService,
): TimelineModel => {
  const { state, setProperty } = useStore();

  const fetchTimeline = async (date: string) => {
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
  };
};
