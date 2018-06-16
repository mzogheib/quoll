import api from '../api';
import utils from '../utils';
import config from './config';

const Activities= { 
  Ride: { label: 'Bike', image: '🚲' },
  Run: { label: 'Run', image: '🏃‍♂️' },
  Walk: { label: 'Walk' , image: '🚶‍♂️' },
};

const getOauthUrl  = () => api.get('strava-auth');
const authenticate = payload => api.post('strava-auth', payload);
const deauthorize = () => api.post('strava-deauth');
const getActivities = params => api.get('strava', params);

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
    const stravaConfig = config.find(c => c.id === 'strava');
    const timeStamp = new Date(activity.start_date);
    const image = Activities[activity.type].image;
    const label = Activities[activity.type].label;
    const value = formatDistance(activity.distance);

    return {
      id: activity.id,
      logo: stravaConfig.image,
      timeStamp: timeStamp.getTime(),
      timeLabel: timeStamp.toLocaleString('en-Au', { hour: 'numeric', minute: 'numeric', hour12: true }),
      image,
      label,
      value
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