const date = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DATE':
      return action.date
    default:
      return state
  }
};

export default date;
