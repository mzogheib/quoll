import api from '../api'

const getOauthUrl = () =>
  api.get({ endpoint: 'feed-auth', params: { feed: 'toshl' } })
const authenticate = payload =>
  api.post({ endpoint: 'feed-auth', payload, params: { feed: 'toshl' } })
const deauthorize = () =>
  api.delete({ endpoint: 'feed-auth', params: { feed: 'toshl' } })

export default {
  getOauthUrl,
  authenticate,
  deauthorize,
}
