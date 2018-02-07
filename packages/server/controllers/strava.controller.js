const axios = require('axios');
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
  const url = baseUrl + '/oauth/token';
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
  const url = `${baseApiUrl}/athlete/activities`
  const options = {
    after: 1517569790,
    before: 1518001789,
    per_page: 100,
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  };
  return axios.get(url, options);
}
