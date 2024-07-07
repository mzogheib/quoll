import {
  stravaSummaryActivitiesAdapter,
  toshlEntriesAdapter,
} from "@quoll/lib";
import { adapter as movesAdapter } from "./moves";

export const moves = { adapter: movesAdapter };
export const strava = { adapter: stravaSummaryActivitiesAdapter };
export const toshl = { adapter: toshlEntriesAdapter };
