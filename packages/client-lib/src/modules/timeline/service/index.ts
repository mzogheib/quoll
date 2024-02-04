import { TimelineEntry } from "../types";

export type TimelineService = {
  get: (date: string) => Promise<TimelineEntry[]>;
};
