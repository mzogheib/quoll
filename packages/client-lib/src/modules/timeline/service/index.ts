import { ISO8601Date, TimelineEntry } from "@quoll/lib";

export type TimelineService = {
  get: (date: ISO8601Date) => Promise<TimelineEntry[]>;
};
