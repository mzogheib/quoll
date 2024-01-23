import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTimeline, selectTimeline, setTimelineFetching } from "./store";

export const useTimelineModel = () => {
  const dispatch = useDispatch();
  const { isFetching, entries } = useSelector(selectTimeline);

  const _fetchTimeline = useCallback(
    async (date: string) => {
      dispatch(setTimelineFetching(true));
      try {
        await fetchTimeline(date)(dispatch);
      } finally {
        dispatch(setTimelineFetching(false));
      }
    },
    [dispatch],
  );

  return {
    isFetching,
    entries,
    fetchTimeline: _fetchTimeline,
  };
};
