import api from '../api'
import { AuthenticatePayload } from './types'

const getOauthUrl = () =>
  api.get<string>({ endpoint: 'feed-auth', params: { feed: 'uber' } })

const authenticate = (payload: AuthenticatePayload) =>
  api.post<void>({ endpoint: 'feed-auth', payload, params: { feed: 'uber' } })

const deauthorize = () =>
  api.delete<void>({ endpoint: 'feed-auth', params: { feed: 'uber' } })

const uberService = {
  getOauthUrl,
  authenticate,
  deauthorize,
}

export default uberService
