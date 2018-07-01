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
    image: require('./images/toshl-196x196.png'),
    getOauthUrl: toshl.getOauthUrl,
    authenticate: toshl.authenticate,
    disconnect: toshl.deauthorize,
    getData: toshl.getEntries,
    makeEntries: toshl.makeEntries,
    makeMapData: toshl.makeMapData,
  },
  {
    id: 'strava',
    name: 'Strava',
    link: {
      url: 'https://www.strava.com',
      label: 'www.strava.com'
    },
    image: require('./images/strava-96x96.png'),
    getOauthUrl: strava.getOauthUrl,
    authenticate: strava.authenticate,
    disconnect: strava.deauthorize,
    getData: strava.getActivities,
    makeEntries: strava.makeEntries,
    makeMapData: strava.makeMapData,
  },
  {
    id: 'moves',
    name: 'Moves',
    link: {
      url: 'https://www.moves-app.com',
      label: 'www.moves-app.com'
    },
    image: require('./images/moves-206x206.png'),
    getOauthUrl: moves.getOauthUrl,
    authenticate: moves.authenticate,
    disconnect: moves.deauthorize,
    getData: moves.getActivities,
    makeEntries: moves.makeEntries,
    makeMapData: moves.makeMapData,
  }
];

export default config;
