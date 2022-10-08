import api from '../api'
import { AuthenticatePayload } from './types'

const getOauthUrl = () =>
  api.get<string>({ endpoint: 'feed-auth', params: { feed: 'toshl' } })

const authenticate = (payload: AuthenticatePayload) =>
  api.post<void>({ endpoint: 'feed-auth', payload, params: { feed: 'toshl' } })

const deauthorize = () =>
  api.delete<void>({ endpoint: 'feed-auth', params: { feed: 'toshl' } })

const toshlService = {
  getOauthUrl,
  authenticate,
  deauthorize,
}

export default toshlService
