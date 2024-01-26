import { Action } from "redux";

import { RootState } from "../../../store";
import { FeedName } from "../types";

enum FeedActionType {
  SetConnected = "SET_FEED_CONNECTED",
  SetAuthenticating = "SET_FEED_AUTHENTICATING",
}

interface SetFeedConnectedAction extends Action<FeedActionType.SetConnected> {
  name: FeedName;
  value: boolean;
}

export interface FeedState {
  name: FeedName;
  isAuthenticating: boolean;
  isConnected: boolean;
}

export const setFeedConnected = (
  name: FeedName,
  value: boolean,
): SetFeedConnectedAction => ({
  type: FeedActionType.SetConnected,
  name,
  value,
});

interface SetFeedAuthenticatingAction
  extends Action<FeedActionType.SetAuthenticating> {
  name: FeedName;
  value: boolean;
}

export const setFeedAuthenticating = (
  name: FeedName,
  value: boolean,
): SetFeedAuthenticatingAction => ({
  type: FeedActionType.SetAuthenticating,
  name,
  value,
});

export const selectFeeds = (state: RootState) => state.feeds;

export const selectHasFeedConnected = (state: RootState) =>
  Object.values(state.feeds).some(({ isConnected }) => isConnected);

const makeDefaultFeedState = (name: FeedName) => ({
  name,
  isAuthenticating: false,
  isConnected: false,
});

const defaultState: Record<FeedName, FeedState> = {
  [FeedName.Moves]: makeDefaultFeedState(FeedName.Moves),
  [FeedName.Strava]: makeDefaultFeedState(FeedName.Strava),
  [FeedName.Uber]: makeDefaultFeedState(FeedName.Uber),
  [FeedName.Toshl]: makeDefaultFeedState(FeedName.Toshl),
};

type FeedAction = SetFeedAuthenticatingAction | SetFeedConnectedAction;

const feeds = (state = defaultState, action: FeedAction) => {
  const { type, name, value } = action;

  switch (type) {
    case FeedActionType.SetConnected:
      return { ...state, [name]: { ...state[name], isConnected: value } };
    case FeedActionType.SetAuthenticating:
      return { ...state, [name]: { ...state[name], isAuthenticating: value } };
    default:
      return state;
  }
};

export default feeds;
