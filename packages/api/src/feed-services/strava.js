import moment from "moment";

import { stravaApi } from "../feed-apis";

export const service = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  refreshAuth,
  getAthleteActivities,
};

function getOAuthUrl() {
  return stravaApi.oauth.url();
}

const transformAuthResponse = ({
  expires_in,
  access_token,
  refresh_token,
}) => ({
  expiry_time: calculateExpiryTime(expires_in),
  access_token,
  refresh_token,
});

function authenticate(code) {
  return stravaApi.oauth.token({ code }).then(transformAuthResponse);
}

function refreshAuth({ refresh_token }) {
  return stravaApi.oauth.refresh({ refresh_token }).then(transformAuthResponse);
}

function deauthorize({ access_token }) {
  return stravaApi.oauth.deauthorize({ access_token });
}

function getAthleteActivities(from, to, token) {
  const after = moment(from).unix() - 1;
  const before = moment(to).unix() + 1;
  const perPage = 20;

  return stravaApi.athlete.activities
    .list({ after, before, per_page: perPage, access_token: token })
    .then((activities) => {
      const promises = activities.map((activity) => {
        return stravaApi.activities.get({
          id: activity.id,
          access_token: token,
        });
      });

      return Promise.all(promises);
    });
}

function calculateExpiryTime(expiresIn) {
  // Substract a small amount to account for lag
  return Math.floor(Date.now() / 1000 + (expiresIn || 3600) - 300);
}
