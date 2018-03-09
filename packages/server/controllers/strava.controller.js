const apiStrava = require('../vendor-apis/strava');

module.exports = {
  authenticate,
  deauthorize,
  getAthleteActivities
};

function authenticate(code) {
  return apiStrava.oauth.token(code);
}

function deauthorize(token) {
  return apiStrava.oauth.deauthorize(token);
}

function getAthleteActivities(parameters, token) {
  // Convert formatted dates to unix timestamps
  // After = 23:59:59 on the day before the from date
  // Before = 00:00:00 on the day after the to date
  const from = new Date(parameters.from);
  const to = new Date(parameters.to);

  const params = {
    after: getLocalTimestamp(from) - 1,
    before: getLocalTimestamp(to) + 24 * 60 * 60,
    perPage: 5
  };

  return apiStrava.athlete.activities(params, token)
    .then(activities => {
      const promises = activities.map(activity => {
        const params = { id: activity.id };
        return apiStrava.activities.get(params, token);
      });

      return Promise.all(promises);
    });
}

const getLocalTimestamp = (d) => {
  return Math.round(d.getTime() / 1000) + d.getTimezoneOffset() * 60;
}