const apiStrava = require('../vendor-apis/strava');

module.exports = {
  authenticate,
  deauthorize,
  getAthleteActivities
};

function authenticate(code) {
  return apiStrava.oauth.token(code)
    .then(apiStrava.authenticate);
}

function deauthorize() {
  return apiStrava.oauth.deauthorize();
}

function getAthleteActivities(parameters) {
  // Convert formatted dates to unix timestamps
  // After = 23:59:59 on the day before the from date
  // Before = 00:00:00 on the day after the to date
  const from = new Date(parameters.from);
  const to = new Date(parameters.to);

  const after = getLocalTimestamp(from) - 1;
  const before = getLocalTimestamp(to) + 24 * 60 * 60;
  const perPage = 5;

  return apiStrava.athlete.activities(after, before, perPage)
    .then(activities => {
      const promises = activities.map(activity => {
        return apiStrava.activities.get(activity.id);
      });

      return Promise.all(promises);
    });
}

const getLocalTimestamp = (d) => {
  return Math.round(d.getTime() / 1000) + d.getTimezoneOffset() * 60;
}