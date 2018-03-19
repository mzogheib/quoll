const axios = require('axios');
const utils = require('../../utils');
const auth = require('./private/strava-auth');

module.exports = {
  oauth: {
    url: oauthUrl,
    token,
    deauthorize
  },
  athlete: {
    activities: athleteActivities
  },
  activities: {
    get: getActivity
  }
};

const baseUrl = 'https://www.strava.com';
const baseOauthUrl = `${baseUrl}/oauth`;
const baseApiUrl = `${baseUrl}/api/v3`;
const makeAuthHeader = token => { return { headers: { 'Authorization': `Bearer ${token}` } }; };

const get = (url, options) => {
  return new Promise((resolve, reject) => {
    axios.get(url, options)
      .then(response => resolve(response.data))
      .catch(error => reject({ status: error.response.status, message: error.response.data.message }));
  });
}

const post = (url, payload) => {
  return new Promise((resolve, reject) => {
    axios.post(url, payload)
      .then(response => resolve(response.data))
      .catch(error => reject({ status: error.response.status, message: error.response.data.message }));
  });
}

function oauthUrl () {
  return `${baseOauthUrl}/authorize?client_id=8709&response_type=code&scope=view_private`;
}

function token(code) {
  const url = `${baseOauthUrl}/token`;
  const payload = {
    client_id: auth.client_id,
    client_secret: auth.client_secret,
    code: code
  };
  return post(url, payload)
    .then(data => data.access_token);
}

function deauthorize(token) {
  const url = `${baseOauthUrl}/deauthorize`;
  const payload = {
    access_token: token
  }
  return post(url, payload);
}

function athleteActivities({ after, before, perPage }, token) {
  const params = {
    after,
    before,
    per_page: perPage
  };
  const url = `${baseApiUrl}/athlete/activities${utils.makeUrlParams(params)}`;
  const options = makeAuthHeader(token);
  return get(url, options);
}

function getActivity({ id }, token) {
  const url = `${baseApiUrl}/activities/${id}`;
  const options = makeAuthHeader(token);
  return get(url, options);
}