import { Action } from 'redux'

import { AppDispatch, GetState } from '..'

import timelineService, { Entry } from '../../services/timeline'

enum TimelineActionType {
  SetFetching = 'SET_TIMELINE_FETCHING',
  SetEntries = 'SET_TIMELINE_ENTRIES',
}

interface SetTimelineFetchingAction
  extends Action<TimelineActionType.SetFetching> {
  value: boolean
}

export const setTimelineFetching = (
  value: boolean
): SetTimelineFetchingAction => ({
  type: TimelineActionType.SetFetching,
  value,
})

interface SetTimelineEntriesAction
  extends Action<TimelineActionType.SetEntries> {
  entries: Entry[]
}

export const setEntries = (entries: Entry[]): SetTimelineEntriesAction => ({
  type: TimelineActionType.SetEntries,
  entries,
})

export const fetchTimeline =
  () => (dispatch: AppDispatch, getState: GetState) => {
    const { date } = getState()

    dispatch(setTimelineFetching(true))
    return timelineService
      .get(date)
      .then((entries) => dispatch(setEntries(entries)))
      .catch(() => dispatch(setTimelineFetching(false)))
  }

const defaultState = { isFetching: true, entries: [] }

type TimelineAction = SetTimelineFetchingAction | SetTimelineEntriesAction

const timeline = (state = defaultState, action: TimelineAction) => {
  switch (action.type) {
    case TimelineActionType.SetFetching:
      return { ...state, isFetching: action.value }
    case TimelineActionType.SetEntries:
      return { entries: action.entries, isFetching: false }
    default:
      return state
  }
}

export default timeline