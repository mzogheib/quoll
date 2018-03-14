import Toshl from './toshl';
import Strava from './strava';

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
    normalize: Toshl.getMarkersFromEntries
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
    normalize: Strava.getPolylinesFromActivities
  }
];

export default config;
