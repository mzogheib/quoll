import { Store } from "../../../store/types";
import { ISO8601Date } from "../../../types";

export type DateState = {
  /**
   * The selected date in ISO 8601 format, i.e. `YYYY-MM-DD`.
   */
  date: ISO8601Date;
};

type DateActions = {
  /**
   * Sets the new date value.
   */
  setDate: (newDate: ISO8601Date) => void;
};

type DateModel = DateState & DateActions;

export const useDateModel = (useStore: () => Store<DateState>): DateModel => {
  const { state, setProperty } = useStore();

  const setDate = (newDate: ISO8601Date) => setProperty("date", newDate);

  return {
    ...state,
    setDate,
  };
};
