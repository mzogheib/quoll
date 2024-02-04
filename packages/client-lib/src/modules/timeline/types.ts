import { FeedName } from "../feeds/types";

export enum TimelineEntryType {
  Bike = "bike",
  Bus = "bus",
  Car = "car",
  EBike = "e-bike",
  Expense = "expense",
  Ferry = "ferry",
  Flight = "flight",
  Hike = "hike",
  Home = "home",
  Motorcycle = "motorcycle",
  Photo = "photo",
  Place = "place",
  Run = "run",
  Train = "train",
  Tram = "tram",
  Transport = "transport",
  Video = "video",
  Walk = "walk",
  Work = "work",
  Yoga = "yoga",
}

interface TimelineEntryLocation {
  latitude?: number;
  longitude?: number;
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
  locationStart: TimelineEntryLocation;
  locationEnd: TimelineEntryLocation;
  polyline: string | null;
  mediaUri: string | null;
};
