import { Action } from 'redux'

import { AppDispatch, RootState } from '..'

import userService, { User } from '../../services/user'
import { setFeedConnected } from '../feeds'

enum UserActionType {
  SetAuthenticating = 'SET_USER_AUTHENTICATING',
  SetReady = 'SET_USER_READY',
}

interface SetUserAuthenticatingAction
  extends Action<UserActionType.SetAuthenticating> {}

export const setUserAuthenticating = (): SetUserAuthenticatingAction => ({
  type: UserActionType.SetAuthenticating,
})

interface SetUserReadyAction extends Action<UserActionType.SetReady> {
  user: User
}

export const setUserReady = (user: User): SetUserReadyAction => ({
  type: UserActionType.SetReady,
  user,
})

export const loginUser = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setUserAuthenticating())
  return userService.login(id).then((user) => {
    user.feeds.forEach(({ name, isConnected }) =>
      dispatch(setFeedConnected(name, isConnected))
    )

    dispatch(setUserReady(user))
  })
}

export const signupUser = () => (dispatch: AppDispatch) => {
  dispatch(setUserAuthenticating())
  return userService.signup().then((user) => {
    dispatch(setUserReady(user))
  })
}

export const selectIsAuthenticating = (state: RootState) =>
  state.user.isAuthenticating

const defaultState = { isAuthenticating: true }

type UserAction = SetUserAuthenticatingAction | SetUserReadyAction

const userReducer = (state = defaultState, action: UserAction) => {
  switch (action.type) {
    case UserActionType.SetAuthenticating:
      return { ...state, isAuthenticating: true }

    case UserActionType.SetReady:
      const { user } = action
      return { ...state, isAuthenticating: false, user }

    default:
      return state
  }
}

export default userReducer
