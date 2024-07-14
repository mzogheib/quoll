import { themes } from ".";

// This adds the theme types to styled-components' DefaultTheme
// https://www.newline.co/@kchan/annotating-react-styled-components-with-typescript--e8076d1d

type QuollTheme = typeof themes.default;

declare module "styled-components" {
  export interface DefaultTheme extends QuollTheme {}
}
