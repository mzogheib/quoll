import toshl from './toshl';
import strava from './strava';
import moves from './moves';
import uber from './uber';

export default [
  {
    name: 'toshl',
    title: 'Toshl',
    link: {
      url: 'https://toshl.com',
      label: 'toshl.com'
    },
    imageConnected: require('../images/toshl-196x196.png'),
    imageDisconnected: require('../images/toshl-gray-196x196.png'),
    getOauthUrl: toshl.getOauthUrl,
    authenticate: toshl.authenticate,
    disconnect: toshl.deauthorize,
  },
  {
    name: 'strava',
    title: 'Strava',
    link: {
      url: 'https://www.strava.com',
      label: 'www.strava.com'
    },
    imageConnected: require('../images/strava-96x96.png'),
    imageDisconnected: require('../images/strava-gray-96x96.png'),
    getOauthUrl: strava.getOauthUrl,
    authenticate: strava.authenticate,
    disconnect: strava.deauthorize,
  },
  {
    name: 'moves',
    title: 'Moves',
    link: {
      url: 'https://www.moves-app.com',
      label: 'www.moves-app.com'
    },
    imageConnected: require('../images/moves-206x206.png'),
    imageDisconnected: require('../images/moves-gray-206x206.png'),
    getOauthUrl: moves.getOauthUrl,
    authenticate: moves.authenticate,
    disconnect: moves.deauthorize,
  },
  {
    name: 'uber',
    title: 'Uber',
    link: {
      url: 'https://www.uber.com',
      label: 'www.uber.com'
    },
    imageConnected: require('../images/uber-256x256.png'),
    imageDisconnected: require('../images/uber-gray-256x256.png'),
    getOauthUrl: uber.getOauthUrl,
    authenticate: uber.authenticate,
    disconnect: uber.deauthorize,
  }
];