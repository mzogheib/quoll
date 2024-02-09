import moment from "moment";
import {
  ISO8601Date,
  TimelineEntry,
  TimelineEntryType,
  TimelineService,
} from "@quoll/client-lib";

import api from "../../../services/api";

const EntryConfig = {
  [TimelineEntryType.Bike]: { label: "Bike", image: "🚲" },
  [TimelineEntryType.Bus]: { label: "Bus", image: "🚌" },
  [TimelineEntryType.Car]: { label: "Car", image: "🚗" },
  [TimelineEntryType.EBike]: { label: "E-Bike", image: "🚲⚡️" },
  [TimelineEntryType.Expense]: { label: "Expense", image: "💸" },
  [TimelineEntryType.Ferry]: { label: "Ferry", image: "🛳️" },
  [TimelineEntryType.Flight]: { label: "Flight", image: "✈️" },
  [TimelineEntryType.Hike]: { label: "Hike", image: "🥾" },
  [TimelineEntryType.Home]: { label: "Home", image: "🏠" },
  [TimelineEntryType.Motorcycle]: { label: "Motorcycle", image: "🏍️" },
  [TimelineEntryType.Place]: { label: "Place", image: "🏬" },
  [TimelineEntryType.Photo]: { label: "Photo", image: "📸" },
  [TimelineEntryType.Run]: { label: "Run", image: "🏃‍♂️" },
  [TimelineEntryType.Train]: { label: "Train", image: "🚆" },
  [TimelineEntryType.Tram]: { label: "Tram", image: "🚊" },
  [TimelineEntryType.Transport]: { label: "Transport", image: "⏩" },
  [TimelineEntryType.Video]: { label: "Video", image: "🎥" },
  [TimelineEntryType.Walk]: { label: "Walk", image: "🚶‍♂️" },
  [TimelineEntryType.Work]: { label: "Work", image: "🏭" },
  [TimelineEntryType.Yoga]: { label: "Yoga", image: "🧘‍♂️" },
};

export const getEntryImage = (entry: TimelineEntry) =>
  EntryConfig[entry.type] ? EntryConfig[entry.type].image : "🤠";

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
