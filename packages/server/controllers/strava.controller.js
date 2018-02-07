const strava = require('strava-v3');
const access_token = require('./private/strava-auth').access_token;

module.exports = {
  activities: { 
    list: list
  }
};

function list (parameters) {
  return new Promise(function (resolve, reject) {
    strava.athlete.listActivities({ access_token, after: 1, before: 1517829153, per_page: 200 }, (error, payload, limits) => {
      if (error) {
        reject(error);
      } else {
        resolve(payload);
      }
    })
  });
}
