import toshl from './toshl'
import strava from './strava'
import moves from './moves'
import uber from './uber'
import { AuthenticatePayload, FeedName } from './types'

export interface FeedService {
  getOauthUrl: () => Promise<string>
  authenticate: (payload: AuthenticatePayload) => Promise<void>
  disconnect: () => Promise<string | void>
}

const feedsService: Record<FeedName, FeedService> = {
  [FeedName.Toshl]: {
    getOauthUrl: toshl.getOauthUrl,
    authenticate: toshl.authenticate,
    disconnect: toshl.deauthorize,
  },
  [FeedName.Strava]: {
    getOauthUrl: strava.getOauthUrl,
    authenticate: strava.authenticate,
    disconnect: strava.deauthorize,
  },
  [FeedName.Uber]: {
    getOauthUrl: uber.getOauthUrl,
    authenticate: uber.authenticate,
    disconnect: uber.deauthorize,
  },
  [FeedName.Moves]: {
    getOauthUrl: moves.getOauthUrl,
    authenticate: moves.authenticate,
    disconnect: moves.deauthorize,
  },
}

export const getFeedService = (name: FeedName) => feedsService[name]

export default feedsService
