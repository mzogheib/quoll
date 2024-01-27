import { useCallback } from "react";

import { useStore } from "./store";

export const useDateModel = () => {
  const { value, setProperty } = useStore();

  const _setDate = useCallback(
    (newDate: string) => setProperty("value", newDate),
    [setProperty],
  );

  return {
    date: value,
    setDate: _setDate,
  };
};
