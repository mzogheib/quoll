import toshl from './toshl'
import strava from './strava'
import moves from './moves'
import uber from './uber'
import { AuthenticatePayload, FeedName } from './types'

export interface FeedService {
  name: FeedName
  title: string
  link: { url: string; label: string }
  imageConnected: string
  imageDisconnected: string
  getOauthUrl: () => Promise<string>
  authenticate: (payload: AuthenticatePayload) => Promise<void>
  disconnect: () => Promise<string | void>
}

const feedsService: Record<FeedName, FeedService> = {
  [FeedName.Toshl]: {
    name: FeedName.Toshl,
    title: 'Toshl',
    link: {
      url: 'https://toshl.com',
      label: 'toshl.com',
    },
    imageConnected: require('../images/toshl-196x196.png'),
    imageDisconnected: require('../images/toshl-gray-196x196.png'),
    getOauthUrl: toshl.getOauthUrl,
    authenticate: toshl.authenticate,
    disconnect: toshl.deauthorize,
  },
  [FeedName.Strava]: {
    name: FeedName.Strava,
    title: 'Strava',
    link: {
      url: 'https://www.strava.com',
      label: 'www.strava.com',
    },
    imageConnected: require('../images/strava-96x96.png'),
    imageDisconnected: require('../images/strava-gray-96x96.png'),
    getOauthUrl: strava.getOauthUrl,
    authenticate: strava.authenticate,
    disconnect: strava.deauthorize,
  },
  [FeedName.Uber]: {
    name: FeedName.Uber,
    title: 'Uber',
    link: {
      url: 'https://www.uber.com',
      label: 'www.uber.com',
    },
    imageConnected: require('../images/uber-256x256.png'),
    imageDisconnected: require('../images/uber-gray-256x256.png'),
    getOauthUrl: uber.getOauthUrl,
    authenticate: uber.authenticate,
    disconnect: uber.deauthorize,
  },
  [FeedName.Moves]: {
    name: FeedName.Moves,
    title: 'Moves',
    link: {
      url: 'https://www.moves-app.com',
      label: 'www.moves-app.com',
    },
    imageConnected: require('../images/moves-206x206.png'),
    imageDisconnected: require('../images/moves-gray-206x206.png'),
    getOauthUrl: moves.getOauthUrl,
    authenticate: moves.authenticate,
    disconnect: moves.deauthorize,
  },
}

export const getFeedService = (name: FeedName) => feedsService[name]

export const getFeedLogo = (name: FeedName) =>
  getFeedService(name).imageConnected

export default feedsService
