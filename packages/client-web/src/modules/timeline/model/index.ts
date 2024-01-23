import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTimeline, selectTimeline } from "./store";

export const useTimelineModel = () => {
  const dispatch = useDispatch();
  const { isFetching, entries } = useSelector(selectTimeline);

  const _fetchTimeline = useCallback(
    (date: string) => fetchTimeline(date)(dispatch),
    [dispatch],
  );

  return {
    isFetching,
    entries,
    fetchTimeline: _fetchTimeline,
  };
};
