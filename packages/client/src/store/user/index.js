import userService from '../../services/user'

export const setUserAuthenticating = () => ({
  type: 'SET_USER_AUTHENTICATING',
})

export const setUserReady = () => ({
  type: 'SET_USER_READY',
})

export const loginUser = id => dispatch => {
  dispatch(setUserAuthenticating())
  return userService.login(id).then(user => {
    dispatch(setUserReady())
    return user
  })
}

export const signupUser = () => dispatch => {
  dispatch(setUserAuthenticating())
  return userService.signup().then(user => {
    dispatch(setUserReady())
    return user
  })
}

const user = (state = { isAuthenticating: true }, action) => {
  switch (action.type) {
    case 'SET_USER_AUTHENTICATING':
      return { ...state, isAuthenticating: true }
    case 'SET_USER_READY':
      return { ...state, isAuthenticating: false }
    default:
      return state
  }
}

export default user
