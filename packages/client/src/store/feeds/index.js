import feedsConfig from '../../services/feeds/config';
import feedsService from '../../services/feeds';

const feedServices = feedsConfig.map(feedsService.make);

export const setFeeds = feeds => ({
  type: 'SET_FEEDS',
  feeds
});

export const setConnectedFeeds = ids => ({
  type: 'SET_CONNECTED_FEEDS',
  ids
});

export const setDisconnectedFeeds = ids => ({
  type: 'SET_DISCONNECTED_FEEDS',
  ids
});

export const setFeedFetching = (id, value) => ({
  type: 'SET_FEED_FETCHING',
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

const refreshFeed = (feed, date) => {
  const feedService = feedServices.find(feedService => feedService.id === feed.id);
  return (dispatch) => {
    dispatch(setFeedFetching(feed.id, true))
    return feedService.getData(date).then(data => {
      dispatch(setFeedFetching(feed.id, false))
      return {
        ...feed,
        data: data,
        entries: feedService.makeEntries(data),
        mapData: feedService.makeMapData(data)
      };
    })
  }
}

export const refreshFeeds = () => {
  return (dispatch, getState) => {
    const state = getState();
    const date = state.date;
    const promises = state.feeds.map(feed => feed.isConnected ? dispatch(refreshFeed(feed, date)) : Promise.resolve(feed))
    return Promise.all(promises).then(feeds => dispatch(setFeeds(feeds)));
  };
};


// TODO: entries can have its own reducer. Can also add map data too
// See how it's done here under 'Handling Actions', https://redux.js.org/advanced/async-actions
const defaultFeeds = feedsConfig.map(config => ({
  id: config.id,
  name: config.name,
  link: config.link,
  image: config.image,
  isFetching: false,
  isConnected: false,
  isAuthenticating: false,
  data: [],
  entries: [],
  mapData: [],
}));

const feeds = (state = defaultFeeds, action) => {
  switch (action.type) {
    case 'SET_FEEDS':
      return action.feeds;
    case 'SET_CONNECTED_FEEDS':
      return state.map(feed => action.ids.includes(feed.id) ? { ...feed, isConnected: true } : feed)
    case 'SET_DISCONNECTED_FEEDS':
      return state.map(feed => action.ids.includes(feed.id) ?
        {
          ...feed,
          isConnected: false,
          entries: [],
          data: [],
          mapData: []
        } :
        feed
      )
    case 'SET_FEED_FETCHING':
      return state.map(feed => feed.id === action.id ? { ...feed, isFetching: action.value } : feed)
    case 'SET_FEED_AUTHENTICATING':
      return state.map(feed => feed.id === action.id ? { ...feed, isAuthenticating: action.value } : feed)
    default:
      return state;
  }
};

export default feeds;
