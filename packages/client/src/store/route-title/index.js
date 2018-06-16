export const setRouteTitle = title => ({
  type: 'SET_ROUTE_TITLE',
  title
});

const routeTitle = (state = null, action) => {
  switch (action.type) {
    case 'SET_ROUTE_TITLE':
      return action.title
    default:
      return state
  }
};

export default routeTitle;
