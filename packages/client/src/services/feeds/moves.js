import api from '../api';
import polyline from '@mapbox/polyline';
import config from './config';
import moment from 'moment';

const Places = {
  home: { image: '🏠' },
  work: { image: '🏭' },
  other: { image: '🏬' }
};

const Activities = { 
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
const getActivities = params => api.get('moves', params).then(segments => segments);

const makeMapData = segments => segments.map(segment => {
  switch (segment.type) {
    case 'move':
      const activities = segment.activities.filter(activity => Activities[activity.activity]);
      return activities.map(activity => {
        const label = Activities[activity.activity].label;
        const distance = formatDistance(activity.distance);
        const encodedPath = polyline.encode(activity.trackPoints.map(point => [point.lat, point.lon]));
        return { 
          id: activity.startTime,
          encodedPath,
          title: `${label} ${distance}`,
          subTitle: moment(activity.startTime).format('h:mm a'),
          description: ''
        };
      })
    case 'place':
      const place = segment.place;
      return [{
        id: segment.startTime,
        latitude: place.location.lat,
        longitude: place.location.lon,
        title: `${place.name || 'Place'}`,
        subTitle: moment(segment.startTime).format('h:mm a'),
        description: ''
      }];
    default:
      return [];
  }
})
.reduce((prev, next) => prev.concat(...next), [])
.filter(polyline => polyline);

const formatDistance = distance => {
  const kms = (distance / 1000).toLocaleString(
    undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }
  );
  return `${kms} km`;
}

const formatDuration = (duration) => {
  const hours = duration / 1000 / 60 / 60;
  if (hours < 1) {
    const minutes = (hours - Math.floor(hours)) * 60;
    return `${Math.floor(minutes)} m`;
  } else {
    const minutes = (hours - Math.floor(hours)) * 60;
    return `${Math.floor(hours)} h ${Math.floor(minutes)} m`;
  }
}

const makeEntries = segments => {
  const movesConfig = config.find(c => c.id === 'moves');
  return segments.map(segment => {
    switch (segment.type) {
      case 'move':
        const activities = segment.activities.filter(activity => Activities[activity.activity]);
        return activities.map(activity => ({
          id: activity.startTime,
          logo: movesConfig.image,
          timeStamp: moment(activity.startTime).unix(),
          timeLabel: moment(activity.startTime).format('h:mm a'),
          image: Activities[activity.activity].image,
          label: Activities[activity.activity].label,
          value: formatDistance(activity.distance)
        }));
      case 'place':
        return [{
          id: segment.startTime,
          logo: movesConfig.image,
          timeStamp: moment(segment.startTime).unix(),
          timeLabel: moment(segment.startTime).format('h:mm a'),
          image: (Places[segment.place.type] || Places.other).image,
          label: segment.place.name || 'Place',
          value: formatDuration(moment(segment.endTime).diff(moment(segment.startTime)))
        }];
      default:
        return [];
    }
  })
  .reduce((prev, next) => prev.concat(...next), [])
  .sort((a, b) => a.timeStamp - b.timeStamp);
};

export default {
  getOauthUrl,
  authenticate,
  deauthorize,
  getActivities,
  makeMapData,
  makeEntries
};