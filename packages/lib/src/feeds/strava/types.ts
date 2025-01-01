// https://developers.strava.com/docs/reference

export type StravaDetailedActivity = {
  id: number;
};

export type StravaSportType =
  | "AlpineSki"
  | "BackcountrySki"
  | "Badminton"
  | "Canoeing"
  | "Crossfit"
  | "EBikeRide"
  | "Elliptical"
  | "EMountainBikeRide"
  | "Golf"
  | "GravelRide"
  | "Handcycle"
  | "HighIntensityIntervalTraining"
  | "Hike"
  | "IceSkate"
  | "InlineSkate"
  | "Kayaking"
  | "Kitesurf"
  | "MountainBikeRide"
  | "NordicSki"
  | "Pickleball"
  | "Pilates"
  | "Racquetball"
  | "Ride"
  | "RockClimbing"
  | "RollerSki"
  | "Rowing"
  | "Run"
  | "Sail"
  | "Skateboard"
  | "Snowboard"
  | "Snowshoe"
  | "Soccer"
  | "Squash"
  | "StairStepper"
  | "StandUpPaddling"
  | "Surfing"
  | "Swim"
  | "TableTennis"
  | "Tennis"
  | "TrailRun"
  | "Velomobile"
  | "VirtualRide"
  | "VirtualRow"
  | "VirtualRun"
  | "Walk"
  | "WeightTraining"
  | "Wheelchair"
  | "Windsurf"
  | "Workout"
  | "Yoga";

/**
 * [latitude, longitude]
 */
export type StravaLatLng = [number, number];

export const isStravaLatLng = (value: any): value is StravaLatLng =>
  Array.isArray(value) &&
  value.length === 2 &&
  typeof value[0] === "number" &&
  typeof value[1] === "number";

type StravaPolylineMap = {
  id: string;
  polyline: string | null;
  summary_polyline: string | null;
};

export type StravaSummaryActivity = {
  id: number;
  sport_type: StravaSportType;
  /**
   * Measured in meters.
   */
  distance: number;
  description: string;
  /**
   * Start date and time at UTC in ISO 8601.
   *
   * @example "2018-07-21T14:28:35Z"
   */
  start_date: string;
  /**
   * Measured in seconds.
   */
  elapsed_time: number;
  map: StravaPolylineMap;
  /**
   * The start point.
   */
  start_latlng: string | StravaLatLng;
  /**
   * The end point.
   */
  end_latlng: string | StravaLatLng;
};
