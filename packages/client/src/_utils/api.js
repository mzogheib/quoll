import axios from 'axios';

const getToshlLocations = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/toshl')
      .then(response => resolve(response.data))
      .catch(reject);
  });
};

export default {
  getToshlLocations
};