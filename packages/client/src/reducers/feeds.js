import feedsConfig from '../services/feeds-config';

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
    default:
      return state;
  }
};

export default feeds;
