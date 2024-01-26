import { Action } from "redux";

import { RootState } from "../../../store";

import { User } from "../types";

enum UserActionType {
  SetAuthenticating = "SET_USER_AUTHENTICATING",
  SetReady = "SET_USER_READY",
}

interface SetUserAuthenticatingAction
  extends Action<UserActionType.SetAuthenticating> {}

export const setUserAuthenticating = (): SetUserAuthenticatingAction => ({
  type: UserActionType.SetAuthenticating,
});

interface SetUserReadyAction extends Action<UserActionType.SetReady> {
  user: User;
}

export const setUserReady = (user: User): SetUserReadyAction => ({
  type: UserActionType.SetReady,
  user,
});

export const selectIsAuthenticating = (state: RootState) =>
  state.user.isAuthenticating;

export const selectUser = (state: RootState) => state.user.user;

type UserAction = SetUserAuthenticatingAction | SetUserReadyAction;

type UserState = {
  isAuthenticating: boolean;
  user: User | undefined;
};

const defaultState: UserState = { isAuthenticating: true, user: undefined };

const userReducer = (
  state: UserState = defaultState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case UserActionType.SetAuthenticating:
      return { ...state, isAuthenticating: true };

    case UserActionType.SetReady:
      const { user } = action;
      return { ...state, isAuthenticating: false, user };

    default:
      return state;
  }
};

export default userReducer;
