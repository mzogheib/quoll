import moment from "moment";
import { ISO8601Date, TimelineEntry, TimelineEntryType } from "@quoll/lib";
import { TimelineService } from "@quoll/client-lib";

import api from "../../../services/api";

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

export const getEntryImage = (entry: TimelineEntry) =>
  EntryConfigMap[entry.type] ? EntryConfigMap[entry.type].image : "🤠";

// TODO move this to client-lib
// Convert to a class
// Has an array of sources to fetch from
// Consumer can push to the array

const get = (date: ISO8601Date) =>
  api.get<TimelineEntry[]>({
    endpoint: "timeline",
    params: {
      from: moment(date).startOf("day").toISOString(),
      to: moment(date).endOf("day").toISOString(),
    },
  });

const timelineService: TimelineService = {
  get,
};

export default timelineService;
