import { useDispatch, useSelector } from "react-redux";
import { selectDate, setDate } from "./store";
import { useCallback } from "react";

export const useDateModel = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);

  const _setDate = useCallback(
    (newDate: string) => dispatch(setDate(newDate)),
    [dispatch],
  );

  return {
    date,
    setDate: _setDate,
  };
};
