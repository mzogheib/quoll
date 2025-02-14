import { getUnixTimestamp } from "../../../date";
import { formatDistance } from "../../../misc/distance";
import { generateRandomString } from "../../../misc/randomString";
import {
  TimelineEntry,
  TimelineEntryLocation,
  TimelineEntryType,
} from "../../types";
import {
  StravaDetailedActivity,
  StravaSportType,
  isStravaLatLng,
  StravaLatLng,
} from "../../../../feeds/strava";

type ActivityConfig = {
  type: TimelineEntryType;
  label: string;
};

const ActivityConfigMap: Partial<Record<StravaSportType, ActivityConfig>> = {
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

export const stravaDetailedActivitiesAdapter = (
  activities: StravaDetailedActivity[],
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
      sport_type,
    } = activity;

    const activityConfig = ActivityConfigMap[sport_type];

    const type = activityConfig?.type ?? "unknown";
    const title = activityConfig?.label ?? "Unknown";
    const _distance = formatDistance(distance);
    const timeStart = getUnixTimestamp(new Date(start_date));
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
      type,
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
