import {
  DateState,
  makeReduxStoreSlice,
  useDateModel as _useDateModel,
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

export const useDateModel = () => _useDateModel(dateStore.useStore);
