import moment from "moment";
import { makeStore } from "store/factory";

export type DateState = {
  value: string;
};

const defaultState: DateState = {
  value: moment().format("YYYY-MM-DD"),
};

export const { reducer, useStore } = makeStore<DateState>("date", defaultState);

export default reducer;
