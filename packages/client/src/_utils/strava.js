import Api from './api';

const authenticate = payload => Api.post('strava', payload);
const getActivities = params => Api.get('strava', params);

export default {
  authenticate,
  getActivities
};