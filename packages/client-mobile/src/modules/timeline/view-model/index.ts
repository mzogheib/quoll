import { ISO8601Date, TimelineEntry } from "@quoll/lib/modules";
import { useMediaModel } from "@modules/media/model";
import { useAuthModel } from "@modules/auth/model";
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
export const useTimelineViewModel = (): TimelineViewModel => {
  const { getAccessToken } = useAuthModel();
  const timelineModel = useTimelineModel(getAccessToken);
  const mediaModel = useMediaModel();

  const refreshMedia = async (date: ISO8601Date) => {
    if (!mediaModel.isConnected) return;

    await mediaModel.refresh(date);
  };

  const fetchTimeline = async (date: ISO8601Date) => {
    await Promise.all([timelineModel.fetchTimeline(date), refreshMedia(date)]);
  };

  const mediaEntries = mediaModel.value?.map(mediaAdapter) ?? [];
  const timelineEntries = timelineModel.entries ?? [];
  const entries = sortItemsByTimestamp([...timelineEntries, ...mediaEntries]);

  return {
    ...timelineModel,
    entries,
    isFetching: timelineModel.isFetching || mediaModel.isRefreshing,
    fetchTimeline,
  };
};
