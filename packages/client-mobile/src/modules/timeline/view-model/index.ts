import { TimelineEntry } from "@quoll/client-lib";
import { useMediaModel } from "@modules/media/model";
import { makeDateFilter } from "@modules/date-bar/logic";
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
  const timelineModel = useTimelineModel();
  const mediaModel = useMediaModel();

  // TODO need to wait until isCheckingPermission is done?
  const refreshMedia = async (date: string) => {
    if (!mediaModel.isConnected) return;

    const dateFilter = makeDateFilter(new Date(date));
    await mediaModel.refresh(dateFilter);
  };

  const fetchTimeline = async (date: string) => {
    await Promise.all([timelineModel.fetchTimeline(date), refreshMedia(date)]);
  };

  const mediaEntries = mediaModel.value.map(mediaAdapter);

  const entries = sortItemsByTimestamp([
    ...timelineModel.entries,
    ...mediaEntries,
  ]);

  return {
    ...timelineModel,
    entries,
    fetchTimeline,
  };
};
