import { useDispatch, useSelector } from "react-redux";
import store from "../../../store";
import { fetchTimeline, selectTimeline } from "../model/store";
import { useCallback } from "react";

const { getState } = store;

export const useTimelineViewModel = () => {
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
