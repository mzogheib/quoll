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
    normalize: Toshl.getMarkersFromEntries
  },
  {
    id: 'strava',
    name: 'Strava',
    oAuthUrl: Strava.oAuthUrl,
    authenticate: Strava.authenticate,
    disconnect: Strava.deauthorize,
    getData: Strava.getActivities,
    normalize: Strava.getPolylinesFromActivities
  }
];

export default config;
