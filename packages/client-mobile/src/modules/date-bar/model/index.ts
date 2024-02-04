import { DateState, useDateModel as _useDateModel } from "@quoll/client-lib";
import { makeStore } from "../../../store";
import { makeISO8601Date } from "../logic";

const defaultState: DateState = {
  date: makeISO8601Date(new Date()),
};

const useDateStore = makeStore(defaultState);

export const useDateModel = () => _useDateModel(useDateStore);
