import { useEffect } from "react";
import { ISO8601Date, TimelineEntry } from "@quoll/lib";
import { useMediaModel } from "../../media/model";
import { useTimelineModel } from "../model";
import { mediaAdapter } from "./feed-adapters/media";

const sortItemsByTimestamp = (entries: TimelineEntry[]): TimelineEntry[] => {
  const sortedEntries = entries.slice();

  sortedEntries.sort((a, b) => a.timeStart - b.timeStart);

  return sortedEntries;
};

type TimelineViewModel = ReturnType<typeof useTimelineModel>;

// TODO should the media fetching and adapting be in a timeline service that
// extends the base timeline service?
export const useTimelineViewModel = (date: ISO8601Date): TimelineViewModel => {
  const timelineModel = useTimelineModel();
  const mediaModel = useMediaModel();

  // Fetch on first render
  useEffect(() => {
    if (mediaModel.isCheckingPermission) return;

    timelineModel.fetchTimeline(date);
    refreshMedia(date);
  }, [mediaModel.isCheckingPermission]);

  const refreshMedia = async (date: ISO8601Date) => {
    if (!mediaModel.isConnected) return;

    await mediaModel.refresh(date);
  };

  const fetchTimeline = async (date: ISO8601Date) => {
    await Promise.all([timelineModel.fetchTimeline(date), refreshMedia(date)]);
  };

  const entries =
    mediaModel.value !== null && timelineModel.entries !== null
      ? sortItemsByTimestamp([
          ...timelineModel.entries,
          ...mediaModel.value.map(mediaAdapter),
        ])
      : null;

  return {
    ...timelineModel,
    entries,
    isFetching: timelineModel.isFetching || mediaModel.isRefreshing,
    fetchTimeline,
  };
};
