import { service as stravaService } from "./strava";
import { service as toshlService } from "./toshl";

const { getAthleteActivities, ...stravaServiceRest } = stravaService;
const { getEntries, ...toshlServiceRest } = toshlService;

export const strava = { ...stravaServiceRest, getData: getAthleteActivities };
export const toshl = { ...toshlServiceRest, getData: getEntries };
