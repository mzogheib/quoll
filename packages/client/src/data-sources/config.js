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
    summarize: Toshl.summarizeData,
    normalize: Toshl.getMarkersFromEntries
  },
  {
    id: 'strava',
    name: 'Strava',
    oAuthUrl: Strava.oAuthUrl,
    authenticate: Strava.authenticate,
    disconnect: Strava.deauthorize,
    getData: Strava.getActivities,
    summarize: Strava.summarizeData,
    normalize: Strava.getPolylinesFromActivities
  }
];

export default config;
