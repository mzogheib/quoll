import serviceStrava, { getAthleteActivities } from "./strava";
import serviceToshl, { getEntries } from "./toshl";

export const strava = { ...serviceStrava, getData: getAthleteActivities };
export const toshl = { ...serviceToshl, getData: getEntries };
