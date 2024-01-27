import { Entry } from "../types";
import { makeStore } from "store/factory";

export type TimelineState = {
  isFetching: boolean;
  entries: Entry[];
};

const defaultState: TimelineState = {
  isFetching: true,
  entries: [],
};

const { reducer, useStore } = makeStore<TimelineState>(
  "timeline",
  defaultState,
);

export default reducer;

export const useTimelineStore = useStore;
