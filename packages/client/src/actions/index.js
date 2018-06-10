import feedsConfig from '../services/feeds-config';
import feedsService from '../services/feeds';
import userService from '../services/user';

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

export const setUserAuthenticating = () => ({
  type: 'SET_USER_AUTHENTICATING'
});

export const setUserReady = () => ({
  type: 'SET_USER_READY'
});

export const loginUser = id => {
  return dispatch => {
    dispatch(setUserAuthenticating())
    return userService.login(id).then(user => {
      dispatch(setUserReady());
      return user;
    });
  }
}

export const signupUser = () => {
  return dispatch => {
    dispatch(setUserAuthenticating())
    return userService.signup().then(user => {
      dispatch(setUserReady());
      return user;
    });
  }
}