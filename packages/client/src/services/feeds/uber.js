import api from '../api'

const getOauthUrl = () =>
  api.get({ endpoint: 'feed-auth', params: { feed: 'uber' } })
const authenticate = payload =>
  api.post({ endpoint: 'feed-auth', payload, params: { feed: 'uber' } })
const deauthorize = () =>
  api.delete({ endpoint: 'feed-auth', params: { feed: 'uber' } })

export default {
  getOauthUrl,
  authenticate,
  deauthorize,
}
