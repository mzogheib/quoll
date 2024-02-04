import { useCallback } from "react";

import { useStore } from "./store";
import timelineService from "../service";

export const useTimelineModel = () => {
  const { state, setProperty } = useStore();
  const { isFetching, entries } = state;

  const fetchTimeline = useCallback(
    async (date: string) => {
      setProperty("isFetching", true);
      try {
        const newEntries = await timelineService.get(date);
        setProperty("entries", newEntries);
      } finally {
        setProperty("isFetching", false);
      }
    },
    [setProperty],
  );

  return {
    isFetching,
    entries,
    fetchTimeline,
  };
};
