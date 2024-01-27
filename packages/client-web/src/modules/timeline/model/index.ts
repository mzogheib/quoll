import { useCallback } from "react";

import { useStore } from "./store";
import timelineService from "../service";

export const useTimelineModel = () => {
  const { isFetching, entries, setProperty } = useStore();

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
