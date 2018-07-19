import feedService from '../../services/feed';

export const setFeedFetching = () => ({
  type: 'SET_FEED_FETCHING'
});

export const setEntries = entries => ({
  type: 'SET_ENTRIES',
  entries
});

export const fetchFeed = () => {
  return (dispatch, getState) => {
    const { date } = getState();
    dispatch(setFeedFetching());
    return feedService.get(date)
      .then(entries => dispatch(setEntries(entries)));
  }
}

const feed = (state = { isFetching: true, entries: [] }, action) => {
  switch (action.type) {
    case 'SET_FEED_FETCHING':
      return { ...state, isFetching: true };
    case 'SET_ENTRIES':
      return { entries: action.entries, isFetching: false };
    default:
      return state
  }
};

export default feed;