const apiStrava = require('../vendor-apis/strava');
const moment = require('moment');
const uuidv4 = require('uuid/v4');

module.exports = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  refreshAuth,
  getAthleteActivities,
  adapter
};

const Activities = { 
  Ride: { type: 'bike', label: 'Bike' },
  Run: { type: 'run', label: 'Run' },
  Walk: { type: 'walk', label: 'Walk' },
};

function getOAuthUrl() {
  return apiStrava.oauth.url();
}

function authenticate(code) {
  return apiStrava.oauth.token(code);
}

function refreshAuth(auth) {
  return Promise.resolve(auth);
}

function deauthorize(auth) {
  return apiStrava.oauth.deauthorize(auth.access_token);
}

function getAthleteActivities(from, to, token) {
  // Convert formatted dates to unix timestamps
  // After = 23:59:59 on the day before the from date
  // Before = 00:00:00 on the day after the to date
  const after = getLocalTimestamp(new Date(from)) - 1;
  const before = getLocalTimestamp(new Date(to)) + 24 * 60 * 60;
  const perPage = 20;

  return apiStrava.athlete.activities(after, before, perPage, token)
    .then(activities => {
      const promises = activities.map(activity => {
        return apiStrava.activities.get(activity.id, token);
      });

      return Promise.all(promises);
    });
}

function adapter (activities) {
  return activities.map(activity => {
    const type = Activities[activity.type].type;
    const title = Activities[activity.type].label;
    const distance = formatDistance(activity.distance);
    const timestampStart = moment(activity.start_date).unix();
    const timestampEnd = timestampStart + activity.elapsed_time * 1000;
    const description = activity.description;
    const locationStart = { latitude: activity.start_latlng[0], longitude: activity.start_latlng[1] };
    const locationEnd = { latitude: activity.end_latlng[0], longitude: activity.end_latlng[1] };
    const polyline = activity.map.polyline;
    return {
      source: 'strava',
      id: uuidv4(),
      type,
      timestampStart,
      timestampEnd,
      title,
      valueLabel: distance,
      description,
      locationStart,
      locationEnd,
      polyline
    }
  })
}

const getLocalTimestamp = (d) => {
  return Math.round(d.getTime() / 1000) + d.getTimezoneOffset() * 60;
}

const formatDistance = distance => {
  const kms = (distance / 1000).toLocaleString(
    undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  );
  return `${kms} km`;
}