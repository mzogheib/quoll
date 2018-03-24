import Api from '../_utils/api';
import mapUtils from '../map/utils';

const getOauthUrl  = () => Api.get('strava-auth');
const authenticate = payload => Api.post('strava-auth', payload);
const deauthorize = () => Api.post('strava-deauth');
const getActivities = params => Api.get('strava', params);

const getPolylinesFromActivities = activities => {
  return activities.map(activity => mapUtils.makePolyline({ encodedPath: activity.map.polyline}));
};

const formatDistance = distance => {
  const kms = (distance / 1000).toLocaleString(
    undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  );
  return `${kms} km`;
}

const makeSummary = activities => {
  const totalDistance = activities.reduce((accumulator, activity) => accumulator + activity.distance, 0);
  return activities.length ? formatDistance(totalDistance) : 'None';
};

const makeSummaryList = (activities) => {
  return activities.map(activity => {
    const timeStamp = new Date(activity.start_date);

    const value = formatDistance(activity.distance);

    return {
      timeStamp: timeStamp.getTime(),
      timeLabel: timeStamp.toLocaleTimeString(),
      label: activity.type,
      value: value
    };
  })
  .sort((a, b) => a.timeStamp - b.timeStamp);
}

export default {
  getOauthUrl,
  authenticate,
  deauthorize,
  getActivities,
  getPolylinesFromActivities,
  makeSummary,
  makeSummaryList
};