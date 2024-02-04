import {
  DateState,
  makeReduxStoreSlice,
  useDateModel as _useDateModel,
} from "@quoll/client-lib";
import moment from "moment";

import { RootState } from "store";

const defaultState: DateState = {
  date: moment().format("YYYY-MM-DD"),
};

export const dateStore = makeReduxStoreSlice<DateState, RootState>(
  "date",
  defaultState,
);

export const useDateModel = () => _useDateModel(dateStore.useStore);
