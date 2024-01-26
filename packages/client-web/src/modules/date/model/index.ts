import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

import { selectDate, setDate } from "./store";

export const useDateModel = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);

  const _setDate = useCallback(
    (newDate: string) => dispatch(setDate(newDate)),
    [dispatch],
  );

  return {
    date: date.value,
    setDate: _setDate,
  };
};
