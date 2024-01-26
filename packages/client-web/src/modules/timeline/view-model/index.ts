import { useCallback } from "react";

import { useDateModel } from "../../date/model";
import { useTimelineModel } from "../model";

export const useTimelineViewModel = () => {
  const timelineModel = useTimelineModel();
  const { date } = useDateModel();

  const { fetchTimeline } = timelineModel;

  const _fetchTimeline = useCallback(async () => {
    await fetchTimeline(date);
  }, [date, fetchTimeline]);

  return {
    ...timelineModel,
    fetchTimeline: _fetchTimeline,
  };
};
