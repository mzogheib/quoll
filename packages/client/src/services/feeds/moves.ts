import api from '../api'
import { AuthenticatePayload } from './types'

const getOauthUrl = () =>
  api.get<string>({ endpoint: 'feed-auth', params: { feed: 'moves' } })

const authenticate = (payload: AuthenticatePayload) =>
  api.post<void>({ endpoint: 'feed-auth', payload, params: { feed: 'moves' } })

const deauthorize = () =>
  api
    .delete<void>({ endpoint: 'feed-auth', params: { feed: 'moves' } })
    .then(() => 'Remember to revoke access in the Moves app.')

const movesService = {
  getOauthUrl,
  authenticate,
  deauthorize,
}

export default movesService
