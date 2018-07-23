import feedService from '../../services/feed';

export const setFeedFetching = value => ({
  type: 'SET_FEED_FETCHING',
  value
});

export const setEntries = entries => ({
  type: 'SET_ENTRIES',
  entries
});

export const fetchFeed = () => {
  return (dispatch, getState) => {
    const { date } = getState();
    dispatch(setFeedFetching(true));
    return feedService.get(date)
      .then(entries => dispatch(setEntries(entries)))
      .catch(dispatch(setFeedFetching(false)));
  }
}

const feed = (state = { isFetching: true, entries: [] }, action) => {
  switch (action.type) {
    case 'SET_FEED_FETCHING':
      return { ...state, isFetching: action.value };
    case 'SET_ENTRIES':
      return { entries: action.entries, isFetching: false };
    default:
      return state
  }
};

export default feed;