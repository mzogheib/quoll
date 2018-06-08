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

export const connectFeed = id => ({
  type: 'CONNECT_FEED',
  id
});

export const disconnectFeed = id => ({
  type: 'DISCONNECT_FEED',
  id
});
