const axios = require('axios');
const utils = require('../utils');
const auth = require('./private/strava-auth');

module.exports = {
  oauth: {
    token
  },
  athlete: { 
    activities: athleteActivities
  }
};

const baseUrl = 'https://www.strava.com';
const baseApiUrl = `${baseUrl}/api/v3`;
let accessToken;

function token(code) {
  const url = `${baseUrl}/oauth/token`;
  const options = {
    client_id: auth.client_id,
    client_secret: auth.client_secret,
    code: code
  };
  return axios.post(url, options)
    .then(response => {
      // Keep the access token for future requests
      accessToken = response.data.access_token;
      return response;
    });
}

function athleteActivities (parameters) {
  const options = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  };
  const from = new Date(parameters.from);
  const to = new Date(parameters.to);
  // After and before are not inclusive. So need to convert the to and from dates accordingly.
  // After = 23:59:59 on the day before the from date
  // Before = 00:00:00 on the day after the to date
  const params = {
    after: getLocalTimestamp(from) - 1,
    before: getLocalTimestamp(to) + 24 * 60 * 60,
    per_page: 5
  };
  const url = `${baseApiUrl}/athlete/activities${utils.makeUrlParams(params)}`;
  return axios.get(url, options);
}

const getLocalTimestamp = (d) => {
  return Math.round(d.getTime() / 1000) + d.getTimezoneOffset() * 60;
}