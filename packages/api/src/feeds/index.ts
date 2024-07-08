import {
  stravaSummaryActivitiesAdapter,
  toshlEntriesAdapter,
} from "@quoll/lib";

import { service as stravaService } from "./strava/service";
import { service as toshlService } from "./toshl/service_";

export const feedServices = {
  strava: stravaService,
  toshl: toshlService,
};

export const feedAdapters = {
  strava: stravaSummaryActivitiesAdapter,
  toshl: toshlEntriesAdapter,
};
