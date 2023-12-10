import { css } from "styled-components";

// Color names from https://www.color-blindness.com/color-name-hue/
const colorPalette = {
  black: "#000000",
  gainsboro: "#DCDCDC",
  grey: "#7F7F7F",
  matterhorn: "#4F4F4F",
  mediumAquamarine: "#6FCF97",
  mineShaft: "#333333",
  royalBlue: "#2F80ED",
  transparent: "transparent",
  white: "#FFFFFF",
  whiteSmoke: "#F2F2F2",
};

const breakpoints = {
  xs: 0,
  sm: 544,
  md: 768,
  lg: 992,
  xl: 1281,
};

const breakpointUp = (size: number) => (styles: TemplateStringsArray) => css`
  @media (min-width: ${size}px) {
    ${styles};
  }
`;

const breakpointDown = (size: number) => (styles: TemplateStringsArray) => css`
  @media (max-width: ${size - 1}px) {
    ${styles};
  }
`;

const breakpointBetweenAny =
  (min: number, max: number) => (styles: TemplateStringsArray) => css`
    @media (min-width: ${min}px) and (max-width: ${max - 1}px) {
      ${styles};
    }
  `;

export const themes = {
  default: {
    colors: colorPalette,
    font: {
      family: "Roboto, sans-serif",
      color: colorPalette.mineShaft,
    },
    media: {
      ...breakpoints,
      breakpointBetweenAny,
      breakpointUp,
      breakpointDown,
    },
  },
};
