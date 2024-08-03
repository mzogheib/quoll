import { ISO8601Date } from "@quoll/lib";

import { Store } from "../../../store/types";

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

  /**
   * Resets the model to its initial state
   */
  reset: () => void;
};

type DateModel = DateState & DateActions;

export const useDateModel = (useStore: () => Store<DateState>): DateModel => {
  const { state, setProperty, reset } = useStore();

  const setDate = (newDate: ISO8601Date) => setProperty("date", newDate);

  return {
    ...state,
    setDate,
    reset,
  };
};
