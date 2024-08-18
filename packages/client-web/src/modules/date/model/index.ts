import {
  DateState,
  makeReduxStoreSlice,
  makeDateModel,
} from "@quoll/client-lib";
import { makeISO8601Date } from "@quoll/lib";

import { RootState } from "store";

const defaultState: DateState = {
  date: makeISO8601Date(new Date()),
};

export const dateStore = makeReduxStoreSlice<DateState, RootState>(
  "date",
  defaultState,
);

export const useDateModel = () => {
  const store = dateStore.useStore();
  return makeDateModel(store);
};
