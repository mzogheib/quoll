/**
 * A palette of colours with human readable names.
 *
 * @remarks
 *
 * Color names from https://www.color-blindness.com/color-name-hue
 */
export const colorPalette = {
  black: "#000000",
  gainsboro: "#DCDCDC",
  grey: "#7F7F7F",
  matterhorn: "#4F4F4F",
  mediumAquamarine: "#6FCF97",
  mineShaft: "#333333",
  red: "#FF0000",
  royalBlue: "#2F80ED",
  transparent: "transparent",
  white: "#FFFFFF",
  whiteSmoke: "#F2F2F2",
};

export type ColorName = keyof typeof colorPalette;

/**
 * The breakpoints for various screen sizes.
 */
export const breakpoints = {
  xs: 0,
  sm: 544,
  md: 768,
  lg: 992,
  xl: 1281,
};
