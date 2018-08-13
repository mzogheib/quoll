import api from '../api';

const getOauthUrl  = () => api.get({ endpoint: 'feed-auth', params: { source: 'uber' }});
const authenticate = payload => api.post({ endpoint: 'feed-auth', payload, params: { source: 'uber' }});
const deauthorize = () => api.delete({ endpoint: 'feed-auth', params: { source: 'uber' }});

export default {
  getOauthUrl,
  authenticate,
  deauthorize
};