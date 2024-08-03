import {
  DateState,
  useDateModel as _useDateModel,
} from "@quoll/client-lib/modules";
import { makeReduxStoreSlice } from "@quoll/client-lib/store";
import { makeISO8601Date } from "@quoll/lib/modules";

import { RootState } from "store";

const defaultState: DateState = {
  date: makeISO8601Date(new Date()),
};

export const dateStore = makeReduxStoreSlice<DateState, RootState>(
  "date",
  defaultState,
);

export const useDateModel = () => _useDateModel(dateStore.useStore);
