import timelineService from '../../services/timeline'

export const setTimelineFetching = value => ({
  type: 'SET_TIMELINE_FETCHING',
  value,
})

export const setEntries = entries => ({
  type: 'SET_TIMELINE_ENTRIES',
  entries,
})

export const fetchTimeline = () => (dispatch, getState) => {
  const { date } = getState()
  dispatch(setTimelineFetching(true))
  return timelineService
    .get(date)
    .then(entries => dispatch(setEntries(entries)))
    .catch(() => dispatch(setTimelineFetching(false)))
}

const timeline = (state = { isFetching: true, entries: [] }, action) => {
  switch (action.type) {
    case 'SET_TIMELINE_FETCHING':
      return { ...state, isFetching: action.value }
    case 'SET_TIMELINE_ENTRIES':
      return { entries: action.entries, isFetching: false }
    default:
      return state
  }
}

export default timeline
