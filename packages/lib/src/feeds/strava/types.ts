// https://developers.strava.com/docs/reference

/**
 * An enumeration of the sport types an activity may have.
 */
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
 * A collection of float objects. A pair of latitude/longitude coordinates,
 * represented as an array of 2 floating point numbers.
 *
 * @example
 * [37.238246, -115.802635]
 */
export type StravaLatLng = [number, number];

export const isStravaLatLng = (value: any): value is StravaLatLng =>
  Array.isArray(value) &&
  value.length === 2 &&
  typeof value[0] === "number" &&
  typeof value[1] === "number";

type StravaPolylineMap = {
  /**
   * The identifier of the map.
   */
  id: string;
  /**
   * The polyline of the map, only returned on detailed representation of an
   * object.
   */
  polyline: string | null;
  /**
   * The summary polyline of the map.
   */
  summary_polyline: string | null;
};

export type StravaSummaryActivity = {
  /**
   * The unique identifier of the activity.
   */
  id: number;
  /**
   * An instance of StravaSportType.
   */
  sport_type: StravaSportType;
  /**
   * The activity's distance, in meters.
   */
  distance: number;
  /**
   * The time at which the activity was started.
   */
  start_date: string;
  /**
   * The activity's elapsed time, in seconds.
   */
  elapsed_time: number;
  /**
   * An instance of StravaPolylineMap.
   */
  map: StravaPolylineMap;

  /**
   * An instance of StravaLatLng.
   */
  start_latlng: string | StravaLatLng;
  /**
   * An instance of StravaLatLng.
   */
  end_latlng: string | StravaLatLng;
};

export type StravaDetailedActivity = StravaSummaryActivity & {
  /**
   * The description of the activity.
   */
  description: string;
};
