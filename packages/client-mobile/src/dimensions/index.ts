import { breakpoints } from "@quoll/ui-primitives";
import { useWindowDimensions } from "react-native";

/**
 * Returns whether the screen is narrow or not.
 *
 * @remarks
 *
 * Narrow is defined by screen breakpoint values from the design system.
 *
 * @returns
 *
 * `true` if the screen is narrow
 *
 * `false` if the screen is wide
 */
export const useIsNarrow = () => {
  const { width } = useWindowDimensions();

  return width <= breakpoints.md;
};
