import feedServices from '../../services/feeds'

export const setFeedConnected = (name, value) => ({
  type: 'SET_FEED_CONNECTED',
  name,
  value,
})

export const setFeedAuthenticating = (name, value) => ({
  type: 'SET_FEED_AUTHENTICATING',
  name,
  value,
})

export const getOauthUrl = (name) => {
  const feedService = feedServices.find((feed) => feed.name === name)
  return (dispatch) => {
    dispatch(setFeedAuthenticating(name, true))
    return feedService
      .getOauthUrl()
      .then((url) => url)
      .finally(() => dispatch(setFeedAuthenticating(name, false)))
  }
}

export const authenticateFeed = (name, code) => {
  const feedService = feedServices.find((feed) => feed.name === name)
  return (dispatch) => {
    dispatch(setFeedAuthenticating(name, true))
    return feedService
      .authenticate({ code })
      .then(() => dispatch(setFeedConnected(name, true)))
      .finally(() => dispatch(setFeedAuthenticating(name, false)))
  }
}

export const disconnectFeed = (name) => {
  const feedService = feedServices.find((feed) => feed.name === name)
  return (dispatch) => {
    dispatch(setFeedAuthenticating(name, true))
    return (
      feedService
        .disconnect()
        // BE may return a message for further, manual instructions
        .then((message) => {
          dispatch(setFeedConnected(name, false))
          return message
        })
        .finally(() => dispatch(setFeedAuthenticating(name, false)))
    )
  }
}

const defaultFeeds = feedServices.map((config) => ({
  ...config,
  isConnected: false,
  isAuthenticating: false,
}))

const feeds = (state = defaultFeeds, action) => {
  switch (action.type) {
    case 'SET_FEED_CONNECTED':
      return state.map((feed) =>
        feed.name === action.name
          ? { ...feed, isConnected: action.value }
          : feed
      )
    case 'SET_FEED_AUTHENTICATING':
      return state.map((feed) =>
        feed.name === action.name
          ? { ...feed, isAuthenticating: action.value }
          : feed
      )
    default:
      return state
  }
}

export default feeds
