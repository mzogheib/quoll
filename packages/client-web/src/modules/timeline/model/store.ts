import { Entry } from "../types";
import { makeStore } from "store/factory";

export type State = {
  isFetching: boolean;
  entries: Entry[];
};

const defaultState: State = {
  isFetching: true,
  entries: [],
};

export const { reducer, useStore } = makeStore<State>("timeline", defaultState);
