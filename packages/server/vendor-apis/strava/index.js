const axios = require('axios');
const querystring = require('querystring');
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

const get = ({ baseURL = baseApiUrl, url, headers, params }) => new Promise((resolve, reject) => {
  const config = {
    method: 'GET',
    baseURL,
    url,
    headers,
    params
  };
  axios.request(config)
    .then(response => resolve(response.data))
    .catch(error => reject({ status: error.response.status, message: error.response.data.message }));
});

const post = ({ baseURL = baseOauthUrl, url, auth, headers, data }) => new Promise((resolve, reject) => {
  const config = {
    method: 'POST',
    baseURL,
    url,
    auth,
    headers,
    data
  };
  axios.request(config)
    .then(response => resolve(response.data))
    .catch(error => reject({ status: error.response.status, message: error.response.data.message }));
});

function oauthUrl () {
  const params = {
    client_id: auth.client_id,
    response_type: 'code',
    scope: 'view_private'
  };
  return `${baseOauthUrl}/authorize?${querystring.stringify(params)}`;
}

function token(code) {
  const data = {
    client_id: auth.client_id,
    client_secret: auth.client_secret,
    code: code
  };
  return post({ url: '/token', data });
}

function deauthorize(token) {
  const data = {
    access_token: token
  }
  return post({ url: '/deauthorize', data });
}

function athleteActivities(after, before, perPage, token) {
  const params = {
    after,
    before,
    per_page: perPage
  };
  return get({ url: '/athlete/activities', headers: { Authorization: `Bearer ${token}` }, params });
}

function getActivity(id, token) {
  return get({ url: `/activities/${id}`, headers: { Authorization: `Bearer ${token}` }});
}