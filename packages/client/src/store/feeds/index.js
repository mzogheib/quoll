import feedServices from '../../services/feeds';

export const setFeedConnected = (id, value) => ({
  type: 'SET_FEED_CONNECTED',
  id,
  value
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
      dispatch(setFeedConnected(id, true));
      dispatch(setFeedAuthenticating(id, false));
    })
  };
};

export const disconnectFeed = (id) => {
  const feedService = feedServices.find(feed => feed.id === id);
  return (dispatch) => {
    dispatch(setFeedAuthenticating(id, true));
    return feedService.disconnect().then(alert => {
      dispatch(setFeedConnected(id, false));
      dispatch(setFeedAuthenticating(id, false));
      return alert;
    })
  };
};

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
    case 'SET_FEED_CONNECTED':
      return state.map(feed => feed.id === action.id ? { ...feed, isConnected: action.value } : feed)
    case 'SET_FEED_AUTHENTICATING':
      return state.map(feed => feed.id === action.id ? { ...feed, isAuthenticating: action.value } : feed)
    default:
      return state;
  }
};

export default feeds;
