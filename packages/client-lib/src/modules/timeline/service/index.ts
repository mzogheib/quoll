import {
  ISO8601Date,
  TimelineEntry,
  TimelineEntryType,
  getEndOfDay,
  getStartOfDay,
} from "@quoll/lib";

import { AuthenticatedApiService } from "../../../utils";

type EntryConfig = {
  label: string;
  image: string;
};

const EntryConfigMap: Record<TimelineEntryType, EntryConfig> = {
  bike: { label: "Bike", image: "🚲" },
  bus: { label: "Bus", image: "🚌" },
  car: { label: "Car", image: "🚗" },
  "e-bike": { label: "E-Bike", image: "🚲⚡️" },
  expense: { label: "Expense", image: "💸" },
  ferry: { label: "Ferry", image: "🛳️" },
  flight: { label: "Flight", image: "✈️" },
  hike: { label: "Hike", image: "🥾" },
  home: { label: "Home", image: "🏠" },
  income: { label: "Income", image: "💰" },
  motorcycle: { label: "Motorcycle", image: "🏍️" },
  photo: { label: "Photo", image: "📸" },
  place: { label: "Place", image: "🏬" },
  run: { label: "Run", image: "🏃‍♂️" },
  train: { label: "Train", image: "🚆" },
  tram: { label: "Tram", image: "🚊" },
  transport: { label: "Transport", image: "⏩" },
  unknown: { label: "Unknown", image: "🤷" },
  velomobile: { label: "Velomobile", image: "🚲🛡️" },
  video: { label: "Video", image: "🎥" },
  walk: { label: "Walk", image: "🚶‍♂️" },
  work: { label: "Work", image: "🏭" },
  yoga: { label: "Yoga", image: "🧘‍♂️" },
};

// TODO should this be somewhere else?
export const getTimelineEntryImage = (entry: TimelineEntry) =>
  EntryConfigMap[entry.type] ? EntryConfigMap[entry.type].image : "🤠";

// TODO
// Has an array of sources to fetch from
// Consumer can push to the array

export class TimelineService extends AuthenticatedApiService {
  async get(date: ISO8601Date) {
    const _date = new Date(date);
    return this.request<TimelineEntry[]>({
      method: "GET",
      endpoint: "/timeline",
      params: {
        from: getStartOfDay(_date).toISOString(),
        to: getEndOfDay(_date).toISOString(),
      },
    });
  }
}
