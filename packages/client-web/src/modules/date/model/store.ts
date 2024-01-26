import moment from "moment";
import { Action } from "redux";
import { RootState } from "../../../store";

enum DateActionType {
  Set = "SET_DATE",
}

interface SetDateAction extends Action<DateActionType.Set> {
  date: string;
}

export const setDate = (date: string): SetDateAction => ({
  type: DateActionType.Set,
  date,
});

export const selectDate = (state: RootState) => state.date;

type DateAction = SetDateAction;

type DateState = {
  value: string;
};

const defaultState: DateState = {
  value: moment().format("YYYY-MM-DD"),
};

const date = (
  state: DateState = defaultState,
  action: DateAction,
): DateState => {
  switch (action.type) {
    case DateActionType.Set:
      return {
        ...state,
        value: action.date,
      };
    default:
      return state;
  }
};

export default date;
