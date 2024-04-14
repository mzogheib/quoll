import { makeISO8601Date } from "@quoll/lib";
import { DateState, useDateModel as _useDateModel } from "@quoll/client-lib";

import { makeStore } from "@utils/store";

const defaultState: DateState = {
  date: makeISO8601Date(new Date("2012-08-08")),
};

const useStore = makeStore(defaultState);

export const useDateModel = () => _useDateModel(useStore);
