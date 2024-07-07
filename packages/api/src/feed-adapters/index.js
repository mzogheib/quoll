import {
  stravaSummaryActivitiesAdapter,
  toshlEntriesAdapter,
} from "@quoll/lib";
import { adapter as movesAdapter } from "./moves";
import { adapter as uberAdapter } from "./uber";

export const moves = { adapter: movesAdapter };
export const strava = { adapter: stravaSummaryActivitiesAdapter };
export const toshl = { adapter: toshlEntriesAdapter };
export const uber = { adapter: uberAdapter };
