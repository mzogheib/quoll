import Toshl from './toshl';
import Strava from './strava';
import Moves from './moves';

const config = [
  {
    id: 'toshl',
    name: 'Toshl',
    getOauthUrl: Toshl.getOauthUrl,
    authenticate: Toshl.authenticate,
    disconnect: Toshl.deauthorize,
    getData: Toshl.getEntries,
    makeSummary: Toshl.makeSummary,
    makeSummaryList: Toshl.makeSummaryList,
    makeMapData: Toshl.makeMarkerDataFromEntries,
    isMarker: true
  },
  {
    id: 'strava',
    name: 'Strava',
    getOauthUrl: Strava.getOauthUrl,
    authenticate: Strava.authenticate,
    disconnect: Strava.deauthorize,
    getData: Strava.getActivities,
    makeSummary: Strava.makeSummary,
    makeSummaryList: Strava.makeSummaryList,
    makeMapData: Strava.makePolylineDataFromActivities,
    isPolyline: true
  },
  {
    id: 'moves',
    name: 'Moves',
    getOauthUrl: Moves.getOauthUrl,
    authenticate: Moves.authenticate,
    disconnect: Moves.deauthorize,
    getData: Moves.getActivities,
    makeSummary: Moves.makeSummary,
    makeSummaryList: Moves.makeSummaryList,
    makeMapData: Moves.makePolylineDataFromActivities,
    isPolyline: true
  }
];

export default config;
