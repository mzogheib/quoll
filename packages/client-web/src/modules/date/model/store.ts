import { makeStore } from "@quoll/client-lib";
import moment from "moment";

import { RootState } from "store";

export type State = {
  value: string;
};

const defaultState: State = {
  value: moment().format("YYYY-MM-DD"),
};

export const { reducer, useStore } = makeStore<State, RootState>(
  "date",
  defaultState,
);
