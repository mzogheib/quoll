import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import store from "../../../store";
import { fetchTimeline, selectTimeline } from "./store";

const { getState } = store;

export const useTimelineModel = () => {
  const dispatch = useDispatch();
  const { isFetching, entries } = useSelector(selectTimeline);

  const _fetchTimeline = useCallback(
    () => fetchTimeline()(dispatch, getState),
    [dispatch],
  );

  return {
    isFetching,
    entries,
    fetchTimeline: _fetchTimeline,
  };
};
