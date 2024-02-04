import { Store } from "../../../store/types";

export type DateState = {
  date: string;
};

export const useDateModel = (useStore: () => Store<DateState>) => {
  const { state, setProperty } = useStore();

  const setDate = (newDate: string) => setProperty("date", newDate);

  return {
    ...state,
    setDate,
  };
};
