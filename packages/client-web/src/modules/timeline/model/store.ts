import { Action } from "redux";

import { RootState } from "../../../store";

import { Entry } from "../types";

enum TimelineActionType {
  SetFetching = "SET_TIMELINE_FETCHING",
  SetEntries = "SET_TIMELINE_ENTRIES",
}

interface SetTimelineFetchingAction
  extends Action<TimelineActionType.SetFetching> {
  value: boolean;
}

export const setTimelineFetching = (
  value: boolean,
): SetTimelineFetchingAction => ({
  type: TimelineActionType.SetFetching,
  value,
});

interface SetTimelineEntriesAction
  extends Action<TimelineActionType.SetEntries> {
  entries: Entry[];
}

export const setEntries = (entries: Entry[]): SetTimelineEntriesAction => ({
  type: TimelineActionType.SetEntries,
  entries,
});

export const selectTimeline = (state: RootState) => state.timeline;

type TimelineAction = SetTimelineFetchingAction | SetTimelineEntriesAction;

type TimelineState = {
  isFetching: boolean;
  entries: Entry[];
};

const defaultState: TimelineState = { isFetching: true, entries: [] };

const timeline = (
  state: TimelineState = defaultState,
  action: TimelineAction,
): TimelineState => {
  switch (action.type) {
    case TimelineActionType.SetFetching:
      return { ...state, isFetching: action.value };
    case TimelineActionType.SetEntries:
      return { entries: action.entries, isFetching: false };
    default:
      return state;
  }
};

export default timeline;
