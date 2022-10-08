import api from '../api'
import { AuthenticatePayload } from './types'

const getOauthUrl = () =>
  api.get<string>({ endpoint: 'feed-auth', params: { feed: 'strava' } })

const authenticate = (payload: AuthenticatePayload) =>
  api.post<void>({ endpoint: 'feed-auth', payload, params: { feed: 'strava' } })

const deauthorize = () =>
  api.delete<void>({ endpoint: 'feed-auth', params: { feed: 'strava' } })

const stravaService = {
  getOauthUrl,
  authenticate,
  deauthorize,
}

export default stravaService
