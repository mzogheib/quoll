const focussedItemId = (state = null, action) => {
  switch (action.type) {
    case 'SET_FOCUSSED_ITEM':
      return action.id
    default:
      return state
  }
};

export default focussedItemId;