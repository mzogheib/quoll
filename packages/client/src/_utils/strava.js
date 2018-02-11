import Api from './api';
import mapUtils from '../map/utils';

const authenticate = payload => Api.post('strava', payload);
const getActivities = params => Api.get('strava', params);

const getPolylinesFromActivities = activities => {
  return activities.map(activity => mapUtils.makePolyline({ encodedPath: activity.map.polyline}));
};

export default {
  authenticate,
  getActivities,
  getPolylinesFromActivities
};