import { useWindowDimensions } from "react-native";

const breakpoints = {
  xs: 0,
  sm: 544,
  md: 768,
  lg: 992,
  xl: 1281,
};

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
