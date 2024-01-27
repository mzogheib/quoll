import { makeStore } from "@quoll/client-lib";

import { RootState } from "store";
import { Entry } from "../types";

export type State = {
  isFetching: boolean;
  entries: Entry[];
};

const defaultState: State = {
  isFetching: true,
  entries: [],
};

export const { reducer, useStore } = makeStore<State, RootState>(
  "timeline",
  defaultState,
);
