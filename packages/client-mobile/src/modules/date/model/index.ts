import { makeISO8601Date } from "@quoll/lib/modules";
import {
  DateState,
  useDateModel as _useDateModel,
} from "@quoll/client-lib/modules";

import { makeStore } from "@utils/store";

const defaultState: DateState = {
  date: makeISO8601Date(new Date()),
};

const useStore = makeStore(defaultState);

export const useDateModel = () => _useDateModel(useStore);
