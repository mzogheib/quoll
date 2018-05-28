import axios from 'axios';

const baseUrl = '/api';

let authHeader;

const authenticate = userId => {
  authHeader = { Authorization: `Basic ${userId}:` };
};

const request = (method, endpoint, params, payload) => {
  const options = {
    method,
    url: `${baseUrl}/${endpoint}`,
    params,
    data: payload,
    headers: authHeader
  };
  return axios(options);
}

const get = (endpoint, params) => {
  return new Promise((resolve, reject) => {
    request('GET', endpoint, params, null)
      .then(response => resolve(response.data))
      .catch(reject);
  });
};

const post = (endpoint, payload) => {
  return new Promise((resolve, reject) => {
    request('POST', endpoint, null, payload)
      .then(response => resolve(response.data))
      .catch(reject);
  });
};

export default {
  authenticate,
  get,
  post
};