import Api from './api';

const getActivities = params => Api.get('strava', params);

export default {
  getActivities
};