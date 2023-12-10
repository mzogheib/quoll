import { FeedName } from "../feeds/types";

export enum EntryType {
  Bike = "bike",
  EBike = "e-bike",
  Bus = "bus",
  Car = "car",
  Expense = "expense",
  Hike = "hike",
  Home = "home",
  Motorcycle = "motorcycle",
  Place = "place",
  Run = "run",
  Train = "train",
  Tram = "tram",
  Transport = "transport",
  Walk = "walk",
  Work = "work",
  Yoga = "yoga",
}

interface EntryLocation {
  latitude?: number;
  longitude?: number;
}

export interface Entry {
  id: string;
  feed: FeedName;
  type: EntryType;
  timeStart: number;
  timeEnd: number;
  title: string;
  valueLabel: string;
  description: string | null;
  locationStart: EntryLocation;
  locationEnd: EntryLocation;
  polyline: string | null;
}
