import { getUnixTimestamp } from "../../../../utils/date";
import { formatDistance } from "../../../../utils/distance";
import { generateRandomString } from "../../../../utils/randomString";
import {
  TimelineEntry,
  TimelineEntryLocation,
  TimelineEntryType,
} from "../../types";
import {
  StravaSummaryActivity,
  StravaActivityType,
  isStravaLatLng,
  StravaLatLng,
} from "./types";

type ActivityConfig = {
  type: TimelineEntryType;
  label: string;
};

const Activities: Record<StravaActivityType, ActivityConfig> = {
  EBikeRide: { type: "e-bike", label: "E-Bike" },
  Hike: { type: "hike", label: "Hike" },
  Ride: { type: "bike", label: "Bike" },
  Run: { type: "run", label: "Run" },
  Velomobile: { type: "velomobile", label: "Velomobile" },
  Walk: { type: "walk", label: "Walk" },
  Yoga: { type: "yoga", label: "Yoga" },
};

const adaptLatLng = ([
  latitude,
  longitude,
]: StravaLatLng): TimelineEntryLocation => ({
  latitude,
  longitude,
});

export const stravaSummaryActivitiesAdapter = (
  activities: StravaSummaryActivity[],
): TimelineEntry[] => {
  return activities.map((activity) => {
    const {
      distance,
      description,
      elapsed_time,
      end_latlng,
      map,
      start_date,
      start_latlng,
      type,
    } = activity;

    const _type = Activities[type].type ?? "unknown";
    const title = Activities[type].label ?? "Activity";
    const _distance = formatDistance(distance);
    const timeStart = getUnixTimestamp(start_date);
    const timeEnd = timeStart + elapsed_time * 1000;
    const locationStart = isStravaLatLng(start_latlng)
      ? adaptLatLng(start_latlng)
      : null;
    const locationEnd = isStravaLatLng(end_latlng)
      ? adaptLatLng(end_latlng)
      : null;
    const polyline = map.polyline;

    return {
      feed: "strava",
      id: generateRandomString(32),
      type: _type,
      timeStart,
      timeEnd,
      title,
      valueLabel: _distance,
      description,
      locationStart,
      locationEnd,
      polyline,
      mediaUri: null,
    };
  });
};
