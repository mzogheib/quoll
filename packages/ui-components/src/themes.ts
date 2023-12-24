import { colorPalette, breakpoints } from "@quoll/ui-primitives";
import { css } from "styled-components";

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
