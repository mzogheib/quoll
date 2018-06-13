import toshl from './toshl';
import strava from './strava';
import moves from './moves';

const config = [
  {
    id: 'toshl',
    name: 'Toshl',
    link: {
      url: 'https://toshl.com',
      label: 'toshl.com'
    },
    getOauthUrl: toshl.getOauthUrl,
    authenticate: toshl.authenticate,
    disconnect: toshl.deauthorize,
    getData: toshl.getEntries,
    makeSummary: toshl.makeSummary,
    makeSummaryList: toshl.makeSummaryList,
    makeMapData: toshl.makeMarkerDataFromEntries,
    isMarker: true
  },
  {
    id: 'strava',
    name: 'Strava',
    link: {
      url: 'https://www.strava.com',
      label: 'www.strava.com'
    },
    getOauthUrl: strava.getOauthUrl,
    authenticate: strava.authenticate,
    disconnect: strava.deauthorize,
    getData: strava.getActivities,
    makeSummary: strava.makeSummary,
    makeSummaryList: strava.makeSummaryList,
    makeMapData: strava.makePolylineDataFromActivities,
    isPolyline: true
  },
  {
    id: 'moves',
    name: 'Moves',
    link: {
      url: 'https://www.moves-app.com',
      label: 'www.moves-app.com'
    },
    getOauthUrl: moves.getOauthUrl,
    authenticate: moves.authenticate,
    disconnect: moves.deauthorize,
    getData: moves.getActivities,
    makeSummary: moves.makeSummary,
    makeSummaryList: moves.makeSummaryList,
    makeMapData: moves.makePolylineDataFromActivities,
    isPolyline: true
  }
];

export default config;
