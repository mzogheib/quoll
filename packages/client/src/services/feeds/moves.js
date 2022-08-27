import api from '../api'

const getOauthUrl = () =>
  api.get({ endpoint: 'feed-auth', params: { feed: 'moves' } })
const authenticate = (payload) =>
  api.post({ endpoint: 'feed-auth', payload, params: { feed: 'moves' } })
const deauthorize = () =>
  api
    .delete({ endpoint: 'feed-auth', params: { feed: 'moves' } })
    .then(() => 'Remember to revoke access in the Moves app.')

const movesService = {
  getOauthUrl,
  authenticate,
  deauthorize,
}

export default movesService
