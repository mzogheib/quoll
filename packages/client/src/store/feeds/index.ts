import { Action } from 'redux'

import { AppDispatch } from '..'
import feedsService from '../../services/feeds'
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

export interface FeedState {
  name: FeedName
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
  return feedsService
    .getOauthUrl(name)
    .then((url) => url)
    .finally(() => dispatch(setFeedAuthenticating(name, false)))
}

export const authenticateFeed =
  (name: FeedName, code: string) => (dispatch: AppDispatch) => {
    dispatch(setFeedAuthenticating(name, true))
    return feedsService
      .authenticate(name, { code })
      .then(() => dispatch(setFeedConnected(name, true)))
      .finally(() => dispatch(setFeedAuthenticating(name, false)))
  }

export const disconnectFeed = (name: FeedName) => (dispatch: AppDispatch) => {
  dispatch(setFeedAuthenticating(name, true))
  return (
    feedsService
      .deauthorize(name)
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
  Object.values(state.feeds).some(({ isConnected }) => isConnected)

const makeDefaultFeedState = (name: FeedName) => ({
  name,
  isAuthenticating: false,
  isConnected: false,
})

const defaultState: Record<FeedName, FeedState> = {
  [FeedName.Moves]: makeDefaultFeedState(FeedName.Moves),
  [FeedName.Strava]: makeDefaultFeedState(FeedName.Strava),
  [FeedName.Uber]: makeDefaultFeedState(FeedName.Uber),
  [FeedName.Toshl]: makeDefaultFeedState(FeedName.Toshl),
}

type FeedAction = SetFeedAuthenticatingAction | SetFeedConnectedAction

const feeds = (state = defaultState, action: FeedAction) => {
  const { type, name, value } = action

  switch (type) {
    case FeedActionType.SetConnected:
      return { ...state, [name]: { ...state[name], isConnected: value } }
    case FeedActionType.SetAuthenticating:
      return { ...state, [name]: { ...state[name], isAuthenticating: value } }
    default:
      return state
  }
}

export default feeds
