import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectTimeline, setEntries, setTimelineFetching } from "./store";
import timelineService from "../service";

export const useTimelineModel = () => {
  const dispatch = useDispatch();
  const { isFetching, entries } = useSelector(selectTimeline);

  const fetchTimeline = useCallback(
    async (date: string) => {
      dispatch(setTimelineFetching(true));
      try {
        const newEntries = await timelineService.get(date);
        dispatch(setEntries(newEntries));
      } finally {
        dispatch(setTimelineFetching(false));
      }
    },
    [dispatch],
  );

  return {
    isFetching,
    entries,
    fetchTimeline,
  };
};
