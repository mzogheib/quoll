import toshl from './toshl';
import strava from './strava';
import moves from './moves';

export default [
  {
    id: 'toshl',
    name: 'Toshl',
    link: {
      url: 'https://toshl.com',
      label: 'toshl.com'
    },
    image: require('../images/toshl-196x196.png'),
    getOauthUrl: toshl.getOauthUrl,
    authenticate: toshl.authenticate,
    disconnect: toshl.deauthorize,
  },
  {
    id: 'strava',
    name: 'Strava',
    link: {
      url: 'https://www.strava.com',
      label: 'www.strava.com'
    },
    image: require('../images/strava-96x96.png'),
    getOauthUrl: strava.getOauthUrl,
    authenticate: strava.authenticate,
    disconnect: strava.deauthorize,
  },
  {
    id: 'moves',
    name: 'Moves',
    link: {
      url: 'https://www.moves-app.com',
      label: 'www.moves-app.com'
    },
    image: require('../images/moves-206x206.png'),
    getOauthUrl: moves.getOauthUrl,
    authenticate: moves.authenticate,
    disconnect: moves.deauthorize,
  }
];