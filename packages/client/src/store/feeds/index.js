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

export const setFeedLoading = id => ({
  type: 'SET_FEED_LOADING',
  id
});

export const setFeedReady = id => ({
  type: 'SET_FEED_READY',
  id
});

export const getOauthUrl = id => {
  const feedService = feedServices.find(feed => feed.id === id);
  return (dispatch) => {
    dispatch(setFeedLoading(id));
    return feedService.getOauthUrl().then(url => {
      dispatch(setFeedReady(id));
      return url;
    })
  };
};

export const authenticateFeed = (id, code) => {
  const feedService = feedServices.find(feed => feed.id === id);
  return (dispatch) => {
    dispatch(setFeedLoading(id));
    return feedService.authenticate({ code }).then(() => {
      dispatch(setConnectedFeeds([id]));
      dispatch(setFeedReady(id));
    })
  };
};

export const disconnectFeed = (id) => {
  const feedService = feedServices.find(feed => feed.id === id);
  return (dispatch) => {
    dispatch(setFeedLoading(id));
    return feedService.disconnect().then(alert => {
      dispatch(setDisconnectedFeeds([id]));
      dispatch(setFeedReady(id));
      return alert;
    })
  };
};

const refreshFeed = (feed, date) => {
  const feedService = feedServices.find(feedService => feedService.id === feed.id);
  return (dispatch) => {
    dispatch(setFeedLoading(feed.id))
    return feedService.getData(date).then(data => {
      dispatch(setFeedReady(feed.id))
      return {
        ...feed,
        data: data,
        summary: feedService.makeSummary(data),
        summaryList: feedService.makeSummaryList(data),
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


// TODO: summaryList can have its own reducer. Can also add map data too
// See how it's done here under 'Handling Actions', https://redux.js.org/advanced/async-actions
const defaultFeeds = feedsConfig.map(config => ({
  id: config.id,
  name: config.name,
  link: config.link,
  image: config.image,
  isLoading: false,
  isConnected: false,
  data: [],
  summary: 'None',
  summaryList: [],
  mapData: [],
  isMarker: config.isMarker,
  isPolyline: config.isPolyline,
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
          summary: 'None',
          summaryList: [],
          data: [],
          mapData: []
        } :
        feed
      )
    case 'SET_FEED_LOADING':
      return state.map(feed => feed.id === action.id ? { ...feed, isLoading: true } : feed)
    case 'SET_FEED_READY':
      return state.map(feed => feed.id === action.id ? { ...feed, isLoading: false } : feed)
    default:
      return state;
  }
};

export default feeds;
