import moment from "moment";
import { makeStore } from "store/factory";

export type State = {
  value: string;
};

const defaultState: State = {
  value: moment().format("YYYY-MM-DD"),
};

export const { reducer, useStore } = makeStore<State>("date", defaultState);
