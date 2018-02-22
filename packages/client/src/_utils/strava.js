import Api from './api';
import mapUtils from '../map/utils';

const oAuthUrl = 'https://www.strava.com/oauth/authorize?client_id=8709&response_type=code&redirect_uri=http://localhost:3000&state=strava&scope=view_private';
const authenticate = payload => Api.post('strava', payload);
const deauthorize = () => Api.post('strava-deauth');
const getActivities = params => Api.get('strava', params);

const getPolylinesFromActivities = activities => {
  return activities.map(activity => mapUtils.makePolyline({ encodedPath: activity.map.polyline}));
};

export default {
  oAuthUrl,
  authenticate,
  deauthorize,
  getActivities,
  getPolylinesFromActivities
};