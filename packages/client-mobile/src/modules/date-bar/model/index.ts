import { makeISO8601Date } from "@quoll/lib";
import { DateState, useDateModel as _useDateModel } from "@quoll/client-lib";

import { makeStore } from "../../../store";

const defaultState: DateState = {
  date: makeISO8601Date(new Date()),
};

const useDateStore = makeStore(defaultState);

export const useDateModel = () => _useDateModel(useDateStore);
