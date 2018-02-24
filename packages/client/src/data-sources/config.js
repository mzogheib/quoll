import Toshl from '../_utils/toshl';
import Strava from '../_utils/strava';

const config = [
  {
    id: 'toshl',
    name: 'Toshl',
    oAuthUrl: Toshl.oAuthUrl,
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
    oAuthUrl: Strava.oAuthUrl,
    authenticate: Strava.authenticate,
    disconnect: Strava.deauthorize,
    getData: Strava.getActivities,
    makeSummary: Strava.makeSummary,
    makeSummaryList: Strava.makeSummaryList,
    normalize: Strava.getPolylinesFromActivities
  }
];

export default config;
