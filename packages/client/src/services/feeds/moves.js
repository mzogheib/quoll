import api from '../api';
import polyline from '@mapbox/polyline';
import config from './config';

const Activities= { 
  walking: { label: 'Walk' , image: '🚶‍♂️' },
  transport: { label: 'Transport', image: '✌️' },
  car: { label: 'Car', image: '🚗' },
  motorcycle: { label: 'Motorcycle', image: '🏍️' },
  tram: { label: 'Tram', image: '🚊' },
  train: { label: 'Train', image: '🚆' },
  bus: { label: 'Bus', image: '🚌' },
};

const getOauthUrl  = () => api.get('moves-auth');
const authenticate = payload => api.post('moves-auth', payload);
const deauthorize = () => api.post('moves-deauth').then(() => 'Remember to revoke access in the Moves app.');
const getActivities = params => api.get('moves', params).then(activities => activities.filter(activity => Activities[activity.activity]));

const makePolylineDataFromActivities = activities => activities.map(activity => {
  const startTime = new Date(formatBasicTimeString(activity.startTime));
  const distance = formatDistance(activity.distance);
  const encodedPath = polyline.encode(activity.trackPoints.map(point => [point.lat, point.lon]));
  return { 
    id: activity.startTime,
    encodedPath,
    title: `${activity.activity} ${distance}`,
    subTitle: startTime.toLocaleTimeString(),
    description: activity.description || ''
  };
});

const formatDistance = distance => {
  const kms = (distance / 1000).toLocaleString(
    undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  );
  return `${kms} km`;
}

const formatBasicTimeString = timeStamp => {
  // e.g. 20180513T084906+1000
  const year = timeStamp.substring(0, 4);
  const month = timeStamp.substring(4, 6);
  const day = timeStamp.substring(6, 8);
  const hours = timeStamp.substring(9, 11);
  const minutes = timeStamp.substring(11, 13);
  const seconds = timeStamp.substring(13, 15);
  // const offset = timeStamp.substring(16, 20);
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

const makeSummary = activities => {
  const totalDistance = activities.reduce((accumulator, activity) => accumulator + activity.distance, 0);
  return activities.length ? formatDistance(totalDistance) : 'None';
};

const makeSummaryList = activities => {
  return activities.map(activity => {
    const movesConfig = config.find(c => c.id === 'moves');
    const timeStamp = new Date(formatBasicTimeString(activity.startTime));
    const image = Activities[activity.activity].image;
    const label = Activities[activity.activity].label;
    const value = formatDistance(activity.distance);

    return {
      id: activity.startTime,
      logo: movesConfig.image,
      timeStamp: timeStamp.getTime(),
      timeLabel: timeStamp.toLocaleString('en-Au', { hour: 'numeric', minute: 'numeric', hour12: true }),
      image,
      label,
      value
    }
  })
  .sort((a, b) => a.timeStamp - b.timeStamp);
};

export default {
  getOauthUrl,
  authenticate,
  deauthorize,
  getActivities,
  makePolylineDataFromActivities,
  makeSummary,
  makeSummaryList
};