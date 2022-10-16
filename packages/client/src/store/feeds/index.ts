import { Action } from 'redux'

import { AppDispatch } from '..'
import feedServices, { FeedService, getFeedService } from '../../services/feeds'
import { FeedName } from '../../services/feeds/types'
import { RootState } from '..'

enum FeedActionType {
  SetConnected = 'SET_FEED_CONNECTED',
  SetAuthenticating = 'SET_FEED_AUTHENTICATING',
}

interface SetFeedConnectedAction extends Action<FeedActionType.SetConnected> {
  name: FeedName
  value: boolean
}

export interface Feed extends FeedService {
  isAuthenticating: boolean
  isConnected: boolean
}

export const setFeedConnected = (
  name: FeedName,
  value: boolean
): SetFeedConnectedAction => ({
  type: FeedActionType.SetConnected,
  name,
  value,
})

interface SetFeedAuthenticatingAction
  extends Action<FeedActionType.SetAuthenticating> {
  name: FeedName
  value: boolean
}

export const setFeedAuthenticating = (
  name: FeedName,
  value: boolean
): SetFeedAuthenticatingAction => ({
  type: FeedActionType.SetAuthenticating,
  name,
  value,
})

export const getOauthUrl = (name: FeedName) => (dispatch: AppDispatch) => {
  dispatch(setFeedAuthenticating(name, true))
  return getFeedService(name)
    .getOauthUrl()
    .then((url) => url)
    .finally(() => dispatch(setFeedAuthenticating(name, false)))
}

export const authenticateFeed =
  (name: FeedName, code: string) => (dispatch: AppDispatch) => {
    dispatch(setFeedAuthenticating(name, true))
    return getFeedService(name)
      .authenticate({ code })
      .then(() => dispatch(setFeedConnected(name, true)))
      .finally(() => dispatch(setFeedAuthenticating(name, false)))
  }

export const disconnectFeed = (name: FeedName) => (dispatch: AppDispatch) => {
  dispatch(setFeedAuthenticating(name, true))
  return (
    getFeedService(name)
      .disconnect()
      // BE may return a message for further, manual instructions
      .then((message) => {
        dispatch(setFeedConnected(name, false))
        return message
      })
      .finally(() => dispatch(setFeedAuthenticating(name, false)))
  )
}

export const selectFeeds = (state: RootState) => state.feeds

export const selectHasFeedConnected = (state: RootState) =>
  state.feeds.some(({ isConnected }) => isConnected)

// TODO: reduce how much stuff in is Feed and FeedService
const defaultState: Feed[] = Object.values(feedServices).map((config) => ({
  ...config,
  isConnected: false,
  isAuthenticating: false,
}))

type FeedAction = SetFeedAuthenticatingAction | SetFeedConnectedAction

const feeds = (state = defaultState, action: FeedAction) => {
  const { type, name, value } = action

  switch (type) {
    case FeedActionType.SetConnected:
      return state.map((feed) =>
        feed.name === name ? { ...feed, isConnected: value } : feed
      )
    case FeedActionType.SetAuthenticating:
      return state.map((feed) =>
        feed.name === name ? { ...feed, isAuthenticating: value } : feed
      )
    default:
      return state
  }
}

export default feeds
