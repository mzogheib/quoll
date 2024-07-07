import moment from "moment";

import { stravaApi } from "../feed-apis";

const getOAuthUrl = () => {
  return stravaApi.oauth.url();
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
  const result = await stravaApi.oauth.token({ code });
  return transformAuthResponse(result);
};

const refreshAuth = async ({ refresh_token }: { refresh_token: string }) => {
  const result = await stravaApi.oauth.refresh({ refresh_token });
  return transformAuthResponse(result);
};

const deauthorize = async ({ access_token }: { access_token: string }) => {
  return stravaApi.oauth.deauthorize({ access_token });
};

const getAthleteActivities = async (
  from: string,
  to: string,
  token: string,
) => {
  const activities = await stravaApi.athlete.activities.list({
    after: moment(from).unix() - 1,
    before: moment(to).unix() + 1,
    per_page: 20,
    access_token: token,
  });

  const promises = activities.map(({ id }) =>
    stravaApi.activities.get({ id, access_token: token }),
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
  getAthleteActivities,
};
