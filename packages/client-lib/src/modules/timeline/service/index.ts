import { ISO8601Date } from "../../../types";
import { TimelineEntry } from "../types";

export type TimelineService = {
  get: (date: ISO8601Date) => Promise<TimelineEntry[]>;
};
