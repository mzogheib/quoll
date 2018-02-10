const axios = require('axios');
const utils = require('../../utils');
const auth = require('./private/strava-auth');

module.exports = {
    authenticate,
    oauth: {
        token
    },
    athlete: {
        activities: athleteActivities
    },
    activities: {
        get: getActivity
    }
};

const baseUrl = 'https://www.strava.com';
const baseApiUrl = `${baseUrl}/api/v3`;
let headers;

// Sets the auth header to be used in each request
function authenticate(accessToken) {
    headers = {
        'Authorization': `Bearer ${accessToken}`
    };
}

const get = url => {
    const options = {
        headers: headers
    };
    return new Promise((resolve, reject) => {
        axios.get(url, options)
            .then(response => resolve(response.data))
            .catch(error => reject({ status: error.response.status, message: error.response.data.message }));
    });
}

function token(code) {
    const url = `${baseUrl}/oauth/token`;
    const payload = {
        client_id: auth.client_id,
        client_secret: auth.client_secret,
        code: code
    };
    return new Promise((resolve, reject) => {
        axios.post(url, payload)
            .then(response => resolve(response.data.access_token))
            .catch(error => reject({ status: error.response.status, message: error.response.data.message }));
    });
}

function athleteActivities(after, before, perPage) {
    const params = {
        after,
        before,
        per_page: perPage
    };
    const url = `${baseApiUrl}/athlete/activities${utils.makeUrlParams(params)}`;
    return get(url);
}

function getActivity(id) {
    const url = `${baseApiUrl}/activities/${id}`;
    return get(url);
}