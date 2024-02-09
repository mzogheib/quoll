import { TimelineEntry } from "@quoll/client-lib";
import { useMediaViewModel } from "@modules/media/view-model";
import { useTimelineModel } from "../model";
import { mediaAdapter } from "./feed-adapters/media";

const sortItemsByTimestamp = (entries: TimelineEntry[]): TimelineEntry[] => {
  const sortedEntries = entries.slice();

  sortedEntries.sort((a, b) => a.timeStart - b.timeStart);

  return sortedEntries;
};

type TimelineViewModel = ReturnType<typeof useTimelineModel>;

// TODO should the media fetching and adapting be in a timeline service that
// extends the base timeline service? Yes. This will ensure the `isFetching`
// value is accurate, which it currently is not.
export const useTimelineViewModel = (): TimelineViewModel => {
  const timelineModel = useTimelineModel();
  const mediaViewModel = useMediaViewModel();

  // TODO need to wait until isCheckingPermission is done?
  const refreshMedia = async (date: string) => {
    if (!mediaViewModel.isConnected) return;

    await mediaViewModel.refresh(date);
  };

  const fetchTimeline = async (date: string) => {
    await Promise.all([timelineModel.fetchTimeline(date), refreshMedia(date)]);
  };

  const mediaEntries = mediaViewModel.value.map(mediaAdapter);

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
