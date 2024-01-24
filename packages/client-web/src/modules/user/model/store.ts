import { Action } from "redux";

import { RootState } from "../../../store/types";

import { User } from "../../../services/user/types";

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

const defaultState = { isAuthenticating: true };

type UserAction = SetUserAuthenticatingAction | SetUserReadyAction;

const userReducer = (state = defaultState, action: UserAction) => {
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
