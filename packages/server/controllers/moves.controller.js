const apiMoves = require('../vendor-apis/moves');
const moment = require('moment');
const uuidv4 = require('uuid/v4');
const polyline = require('@mapbox/polyline');

module.exports = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  refreshAuth,
  getSegments,
  adapter
};

const Activities = { 
  walking: { type: 'walk', label: 'Walk' },
  transport: { type: 'transport', label: 'Transport' },
  car: { type: 'car', label: 'Car' },
  motorcycle: { type: 'motorcycle', label: 'Motorcycle' },
  tram: { type: 'tram', label: 'Tram' },
  train: { type: 'train', label: 'Train' },
  bus: { type: 'bus', label: 'Bus' },
};

function getOAuthUrl() {
  return apiMoves.oauth.url();
}

function authenticate(code) {
  return apiMoves.oauth.token(code)
    .then(data => {
      const expiry_time = calculateExpiryTime(data.expires_in);
      return { expiry_time, ...data };
    });
}

function deauthorize() {
  return Promise.resolve();
}

function refreshAuth(auth) {
  return apiMoves.oauth.refresh(auth)
    .then(data => {
      const expiry_time = calculateExpiryTime(data.expires_in);
      return { expiry_time, ...data };
    });
}

function getSegments (from, to, token) {
  const trackPoints = true;
  return apiMoves.storyline(from, to, trackPoints, token)
    // Flatten segments to a 1D array
    .then(storyline => storyline.reduce((prev, next) => prev.concat([].concat(...next.segments)), []));
}

function adapter(segments) {
  return segments.map(segment => {
    switch (segment.type) {
      case 'move':
        const activities = segment.activities.filter(activity => Activities[activity.activity]);
        return activities.map(activity => {
          const type = Activities[activity.activity].type;
          const title = Activities[activity.activity].label;
          const timestampStart = moment(activity.startTime).unix();
          const timestampEnd = moment(activity.endTime).unix();
          const distance = formatDistance(activity.distance);
          const encodedPath = activity.trackPoints.length && polyline.encode(activity.trackPoints.map(point => [point.lat, point.lon]));
          const startPoint = activity.trackPoints.length && activity.trackPoints[0];
          const endPoint = activity.trackPoints.length && activity.trackPoints[activity.trackPoints.length - 1];
          const locationStart = { latitude: startPoint.lat, longitude: startPoint.lon };
          const locationEnd = { latitude: endPoint.lat, longitude: endPoint.lon };
          return {
            source: 'moves',
            id: uuidv4(),
            type,
            timestampStart,
            timestampEnd,
            title,
            valueLabel: distance,
            description: null,
            locationStart,
            locationEnd,
            polyline: encodedPath
          }
        })
      case 'place':
        const place = segment.place;
        const title = `${place.name || 'Place'}`;
        const timestampStart = moment(segment.startTime).unix();
        const timestampEnd = moment(segment.endTime).unix();
        const duration = formatDuration(moment(segment.endTime).diff(moment(segment.startTime)));
        const locationStart = { latitude: place.location.lat, longitude: place.location.lon };
        const locationEnd = locationStart;
        return [{
          source: 'moves',
          id: uuidv4(),
          type: 'place',
          timestampStart,
          timestampEnd,
          title,
          valueLabel: duration,
          description: null,
          locationStart,
          locationEnd,
          polyline: null
        }]
    default:
        return [];
    }
  });
}

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

function calculateExpiryTime(expiresIn) {
  // Substract a small amount to account for lag
  return Math.floor(Date.now() / 1000 + (expiresIn || 3600) - 300);
}