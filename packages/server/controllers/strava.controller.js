const apiStrava = require('../vendor-apis/strava');

module.exports = {
  authenticate,
  getAthleteActivities
};

function authenticate(code) {
  return apiStrava.oauth.token(code);
}

function getAthleteActivities (parameters) {
  return apiStrava.athlete.activities(parameters);
}