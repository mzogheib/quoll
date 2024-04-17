const moment = require("moment");
const apiUber = require("../feed-apis").uber;

module.exports = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  refreshAuth,
  getHistory,
};

function getOAuthUrl() {
  return apiUber.oauth.url();
}

function authenticate(code) {
  return apiUber.oauth.token({ code }).then((data) => {
    const expiry_time = calculateExpiryTime(data.expires_in);
    return { expiry_time, ...data };
  });
}

function deauthorize(auth) {
  return apiUber.oauth.deauthorize(auth);
}

function refreshAuth(auth) {
  return apiUber.oauth.refresh(auth).then((data) => {
    const expiry_time = calculateExpiryTime(data.expires_in);
    return { expiry_time, ...data };
  });
}

function getHistory(from, to, token) {
  const offset = 0;
  const limit = 50;
  const fromTime = moment(from).unix();
  const toTime = moment(to).endOf("day").unix();
  const initialResults = [];
  return history(offset, limit, token, fromTime, initialResults).then(
    (results) =>
      results.filter(
        (result) =>
          result.start_time >= fromTime && result.start_time <= toTime,
      ),
  );
}

function history(offset, limit, token, fromTime, results) {
  return apiUber
    .history({ offset, limit, access_token: token })
    .then((response) => {
      // Get the minTime from response.history
      const minTime = response.history.reduce(
        (min, ride) => (ride.start_time < min ? ride.start_time : min),
        response.history[0].start_time,
      );
      const exhausted = response.count - response.limit - response.offset <= 0;
      if (fromTime > minTime || exhausted) {
        // Nothing further to check
        return results.concat(response.history);
      } else {
        // Keep checking
        return history(
          offset + limit,
          limit,
          token,
          fromTime,
          results.concat(response.history),
        );
      }
    });
}

function calculateExpiryTime(expiresIn) {
  // Substract a small amount to account for lag
  return Math.floor(Date.now() / 1000 + (expiresIn || 3600) - 300);
}
