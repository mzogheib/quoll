import Api from './api';
import utils from './utils';

const getOauthUrl  = () => Api.get('strava-auth');
const authenticate = payload => Api.post('strava-auth', payload);
const deauthorize = () => Api.post('strava-deauth');
const getActivities = params => Api.get('strava', params);

const makePolylineDataFromActivities = activities => activities.map(activity => {
  const startTime = utils.getTwentyFourHourTime(activity.start_date_local);
  const distance = formatDistance(activity.distance);
  return { 
    id: activity.id,
    encodedPath: activity.map.polyline,
    title: `${activity.type} ${distance}`,
    subTitle: startTime,
    description: activity.description || ''
  };
});

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
      id: activity.id,
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
  makePolylineDataFromActivities,
  makeSummary,
  makeSummaryList
};