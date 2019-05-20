import api from '../api'

const getOauthUrl = () =>
  api.get({ endpoint: 'feed-auth', params: { source: 'strava' } })
const authenticate = payload =>
  api.post({ endpoint: 'feed-auth', payload, params: { source: 'strava' } })
const deauthorize = () =>
  api.delete({ endpoint: 'feed-auth', params: { source: 'strava' } })

export default {
  getOauthUrl,
  authenticate,
  deauthorize,
}
