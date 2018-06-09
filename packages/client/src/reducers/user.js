const user = (state = { isAuthenticating: true }, action) => {
  switch (action.type) {
    case 'SET_USER_AUTHENTICATING':
      return { ...state, isAuthenticating: true };
    case 'SET_USER_READY':
      return { ...state, isAuthenticating: false };
    default:
      return state
  }
};

export default user;
