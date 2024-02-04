import { FeedName, TimelineEntry } from "@quoll/client-lib";

export type TimelineEntryMobile = Omit<TimelineEntry, "feed"> & {
  feed: FeedName | "media";
};
