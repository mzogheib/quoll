import feedsConfig from '../services/feeds-config';
import feedsService from '../services/feeds';

const feedServices = feedsConfig.map(feedsService.make);

export const setDate = date => ({
  type: 'SET_DATE',
  date
});

export const setFocussedItem = id => ({
  type: 'SET_FOCUSSED_ITEM',
  id
});

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

export const disconnectFeed = (id, code) => {
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