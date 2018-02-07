import axios from 'axios';

const get = (endpoint, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/${endpoint}`, { params })
      .then(response => resolve(response.data))
      .catch(reject);
  });
};

const post = (endpoint, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/${endpoint}`, payload)
      .then(response => resolve(response.data))
      .catch(reject);
  });
};

export default {
  get,
  post
};