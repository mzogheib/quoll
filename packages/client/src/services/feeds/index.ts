import { AuthenticatePayload, FeedName } from './types'
import api from '../api'

const endpoint = 'feed-auth'

const getOauthUrl = (feed: FeedName) =>
  api.get<string>({ endpoint, params: { feed } })

const authenticate = (feed: FeedName, payload: AuthenticatePayload) =>
  api.post<void>({ endpoint, payload, params: { feed } })

const deauthorize = (feed: FeedName) =>
  api.delete<void>({ endpoint, params: { feed } }).then(() => {
    if (feed === FeedName.Moves) {
      return 'Remember to revoke access in the Moves app.'
    }
  })

const feedsService = {
  getOauthUrl,
  authenticate,
  deauthorize,
}

export default feedsService
