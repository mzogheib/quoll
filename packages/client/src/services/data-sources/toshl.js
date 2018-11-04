import api from '../api'

const getOauthUrl = () =>
  api.get({ endpoint: 'feed-auth', params: { source: 'toshl' } })
const authenticate = payload =>
  api.post({ endpoint: 'feed-auth', payload, params: { source: 'toshl' } })
const deauthorize = () =>
  api.delete({ endpoint: 'feed-auth', params: { source: 'toshl' } })

export default {
  getOauthUrl,
  authenticate,
  deauthorize,
}
