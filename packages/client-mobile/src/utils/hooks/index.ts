import { useRef, useEffect } from "react";

/**
 * A hook that returns the previous value of an input.
 * @param value The current value.
 * @returns The previous value.
 */
export const usePrevious = <ValueType>(value: ValueType) => {
  const ref = useRef<ValueType>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
