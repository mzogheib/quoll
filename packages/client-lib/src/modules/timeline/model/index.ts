import { Store } from "../../../store/types";
import { TimelineService } from "../service";
import { TimelineEntry } from "../types";

export type TimelineState = {
  isFetching: boolean;
  entries: TimelineEntry[];
};

export const useTimelineModel = (
  useStore: () => Store<TimelineState>,
  timelineService: TimelineService,
) => {
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
