import axios from 'axios';

const get = (endpoint, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/${endpoint}`, { params })
      .then(response => resolve(response.data))
      .catch(reject);
  });
};

export default {
  get
};