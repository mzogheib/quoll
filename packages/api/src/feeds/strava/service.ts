import moment from "moment";
import {
  StravaApi,
  StravaAuthApi,
  StravaDetailedActivity,
} from "@quoll/lib/feeds/strava";

import { getEnvVariable } from "../../utils/env";

const stravaApi = new StravaApi({ baseUrl: "https://www.strava.com/api/v3" });
const stravaAuthApi = new StravaAuthApi({
  baseUrl: "https://www.strava.com/oauth",
  redirectUri: getEnvVariable("CLIENT_OAUTH_URL"),
  clientId: getEnvVariable("STRAVA_CLIENT_ID"),
  clientSecret: getEnvVariable("STRAVA_CLIENT_SECRET"),
  scopes: ["read", "read_all", "activity:read_all"],
});

const getOAuthUrl = () => {
  return stravaAuthApi.url();
};

const transformAuthResponse = ({
  expires_in,
  access_token,
  refresh_token,
}: {
  expires_in: number;
  access_token: string;
  refresh_token: string;
}) => ({
  expiry_time: calculateExpiryTime(expires_in),
  access_token,
  refresh_token,
});

const authenticate = async (code: string) => {
  const result = await stravaAuthApi.authorize({ code });
  return transformAuthResponse(result);
};

const refreshAuth = async ({ refresh_token }: { refresh_token: string }) => {
  const result = await stravaAuthApi.refresh({ refresh_token });
  return transformAuthResponse(result);
};

const deauthorize = async ({ access_token }: { access_token: string }) => {
  const result = await stravaAuthApi.deauthorize({ access_token });
  return result;
};

const getAthleteActivities = async (
  from: string,
  to: string,
  accessToken: string,
): Promise<StravaDetailedActivity[]> => {
  const activities = await stravaApi.atheleteActivitiesList({
    after: moment(from).unix() - 1,
    before: moment(to).unix() + 1,
    per_page: 20,
    accessToken,
  });

  const promises = activities.map(({ id }) =>
    stravaApi.activitiesGet({ id, accessToken }),
  );

  return await Promise.all(promises);
};

const calculateExpiryTime = (expiresIn: number) => {
  // Substract a small amount to account for lag
  return Math.floor(Date.now() / 1000 + (expiresIn || 3600) - 300);
};

export const service = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  refreshAuth,
  getData: getAthleteActivities,
};
