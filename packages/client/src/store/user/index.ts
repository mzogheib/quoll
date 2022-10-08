import { Action } from 'redux'

import { AppDispatch } from '..'

import userService from '../../services/user'

enum UserActionType {
  SetAuthenticating = 'SET_USER_AUTHENTICATING',
  SetReady = 'SET_USER_READY',
}

interface SetUserAuthenticatingAction
  extends Action<UserActionType.SetAuthenticating> {}

export const setUserAuthenticating = (): SetUserAuthenticatingAction => ({
  type: UserActionType.SetAuthenticating,
})

interface SetUserReadyAction extends Action<UserActionType.SetReady> {}

export const setUserReady = (): SetUserReadyAction => ({
  type: UserActionType.SetReady,
})

export const loginUser = (id: string) => (dispatch: AppDispatch) => {
  dispatch(setUserAuthenticating())
  return userService.login(id).then((user) => {
    dispatch(setUserReady())
    return user
  })
}

export const signupUser = () => (dispatch: AppDispatch) => {
  dispatch(setUserAuthenticating())
  return userService.signup().then((user) => {
    dispatch(setUserReady())
    return user
  })
}

const defaultState = { isAuthenticating: true }

type UserAction = SetUserAuthenticatingAction | SetUserReadyAction

const user = (state = defaultState, action: UserAction) => {
  switch (action.type) {
    case UserActionType.SetAuthenticating:
      return { ...state, isAuthenticating: true }
    case UserActionType.SetReady:
      return { ...state, isAuthenticating: false }
    default:
      return state
  }
}

export default user
