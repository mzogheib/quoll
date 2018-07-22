import feedServices from '../../services/feeds';

export const setConnectedFeeds = ids => ({
  type: 'SET_CONNECTED_FEEDS',
  ids
});

export const setDisconnectedFeeds = ids => ({
  type: 'SET_DISCONNECTED_FEEDS',
  ids
});

export const setFeedAuthenticating = (id, value) => ({
  type: 'SET_FEED_AUTHENTICATING',
  id,
  value
});

export const getOauthUrl = id => {
  const feedService = feedServices.find(feed => feed.id === id);
  return (dispatch) => {
    dispatch(setFeedAuthenticating(id, true));
    return feedService.getOauthUrl().then(url => {
      return url;
    })
  };
};

export const authenticateFeed = (id, code) => {
  const feedService = feedServices.find(feed => feed.id === id);
  return (dispatch) => {
    dispatch(setFeedAuthenticating(id, true));
    return feedService.authenticate({ code }).then(() => {
      dispatch(setConnectedFeeds([id]));
      dispatch(setFeedAuthenticating(id, false));
    })
  };
};

export const disconnectFeed = (id) => {
  const feedService = feedServices.find(feed => feed.id === id);
  return (dispatch) => {
    dispatch(setFeedAuthenticating(id, true));
    return feedService.disconnect().then(alert => {
      dispatch(setDisconnectedFeeds([id]));
      dispatch(setFeedAuthenticating(id, false));
      return alert;
    })
  };
};

// TODO: entries can have its own reducer. Can also add map data too
// See how it's done here under 'Handling Actions', https://redux.js.org/advanced/async-actions
const defaultFeeds = feedServices.map(config => ({
  id: config.id,
  name: config.name,
  link: config.link,
  image: config.image,
  isConnected: false,
  isAuthenticating: false,
}));

const feeds = (state = defaultFeeds, action) => {
  switch (action.type) {
    case 'SET_CONNECTED_FEEDS':
      return state.map(feed => action.ids.includes(feed.id) ? { ...feed, isConnected: true } : feed)
    case 'SET_DISCONNECTED_FEEDS':
      return state.map(feed => action.ids.includes(feed.id) ? { ...feed, isConnected: false } : feed )
    case 'SET_FEED_AUTHENTICATING':
      return state.map(feed => feed.id === action.id ? { ...feed, isAuthenticating: action.value } : feed)
    default:
      return state;
  }
};

export default feeds;
