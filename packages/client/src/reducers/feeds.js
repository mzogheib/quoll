import feedsConfig from '../services/feeds-config';

// TODO: summaryList can have its own reducer. Can also add map data too
// See how it's done here under 'Handling Actions', https://redux.js.org/advanced/async-actions
const defaultFeeds = feedsConfig.map(config => ({
  id: config.id,
  name: config.name,
  isConnected: false,
  data: [],
  summary: 'None',
  summaryList: [],
  isMarker: config.isMarker,
  isPolyline: config.isPolyline,
}));

const feeds = (state = defaultFeeds, action) => {
  switch (action.type) {
    case 'SET_FEEDS':
      return action.feeds;
    case 'SET_CONNECTED_FEEDS':
      return state.map(feed => action.ids.includes(feed.id) ? { ...feed, isConnected: true } : feed)
    case 'CONNECT_FEED':
      return state.map(feed => feed.id === action.id ? { ...feed, isConnected: true } : feed)
    case 'DISCONNECT_FEED':
      return state.map(feed => feed.id === action.id ? { ...feed, isConnected: false } : feed)
    default:
      return state;
  }
};

export default feeds;
