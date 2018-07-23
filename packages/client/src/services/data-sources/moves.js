import api from '../api';

const getOauthUrl  = () => api.get({ endpoint: 'feed-auth', params: { source: 'moves' }});
const authenticate = payload => api.post({ endpoint: 'feed-auth', payload, params: { source: 'moves' }});
const deauthorize = () => api.delete({ endpoint: 'feed-auth', params: { source: 'moves' }}).then(() => 'Remember to revoke access in the Moves app.');

export default {
  getOauthUrl,
  authenticate,
  deauthorize
};