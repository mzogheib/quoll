import { Store } from "../../../store/types";

export type DateState = {
  /**
   * The selected date in ISO 8601 format, i.e. `YYYY-MM-DD`.
   */
  date: string;
};

type DateActions = {
  /**
   * Sets the new date value.
   */
  setDate: (newDate: string) => void;
};

type DateModel = DateState & DateActions;

export const useDateModel = (useStore: () => Store<DateState>): DateModel => {
  const { state, setProperty } = useStore();

  const setDate = (newDate: string) => setProperty("date", newDate);

  return {
    ...state,
    setDate,
  };
};
