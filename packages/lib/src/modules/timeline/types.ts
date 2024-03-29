import { FeedName } from "../feeds/types";

export type TimelineEntryType =
  | "bike"
  | "bus"
  | "car"
  | "e-bike"
  | "expense"
  | "ferry"
  | "flight"
  | "hike"
  | "income"
  | "home"
  | "motorcycle"
  | "photo"
  | "place"
  | "run"
  | "train"
  | "tram"
  | "transport"
  | "unknown"
  | "velomobile"
  | "video"
  | "walk"
  | "work"
  | "yoga";

export interface TimelineEntryLocation {
  latitude: number;
  longitude: number;
}

export type TimelineEntry = {
  id: string;
  feed: FeedName;
  type: TimelineEntryType;
  timeStart: number;
  timeEnd: number;
  title: string;
  valueLabel: string;
  description: string | null;
  locationStart: TimelineEntryLocation | null;
  locationEnd: TimelineEntryLocation | null;
  polyline: string | null;
  mediaUri: string | null;
};
