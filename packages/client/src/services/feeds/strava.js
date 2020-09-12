import api from '../api'

const getOauthUrl = () =>
  api.get({ endpoint: 'feed-auth', params: { feed: 'strava' } })
const authenticate = (payload) =>
  api.post({ endpoint: 'feed-auth', payload, params: { feed: 'strava' } })
const deauthorize = () =>
  api.delete({ endpoint: 'feed-auth', params: { feed: 'strava' } })

export default {
  getOauthUrl,
  authenticate,
  deauthorize,
}
