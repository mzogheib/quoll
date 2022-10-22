import { FeedName } from '../services/feeds/types'

export const feedConfig = {
  [FeedName.Toshl]: {
    title: 'Toshl',
    link: { url: 'https://toshl.com', label: 'toshl.com' },
    imageConnected: require('./images/toshl-196x196.png'),
    imageDisconnected: require('./images/toshl-gray-196x196.png'),
  },
  [FeedName.Strava]: {
    title: 'Strava',
    link: { url: 'https://www.strava.com', label: 'www.strava.com' },
    imageConnected: require('./images/strava-96x96.png'),
    imageDisconnected: require('./images/strava-gray-96x96.png'),
  },
  [FeedName.Uber]: {
    title: 'Uber',
    link: { url: 'https://www.uber.com', label: 'www.uber.com' },
    imageConnected: require('./images/uber-256x256.png'),
    imageDisconnected: require('./images/uber-gray-256x256.png'),
  },
  [FeedName.Moves]: {
    title: 'Moves',
    link: { url: 'https://www.moves-app.com', label: 'www.moves-app.com' },
    imageConnected: require('./images/moves-206x206.png'),
    imageDisconnected: require('./images/moves-gray-206x206.png'),
  },
}
