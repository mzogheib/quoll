import {
  ImageStyle,
  TextStyle,
  ViewStyle,
  useWindowDimensions,
} from "react-native";

type ScreenWidthLabel = "xs" | "sm" | "md" | "lg" | "xl";

// TODO get these from ui-components or a new shared package
const breakpoints: Record<ScreenWidthLabel, number> = {
  xs: 0,
  sm: 544,
  md: 768,
  lg: 992,
  xl: 1281,
};

/**
 * Watches the screen width and returns the label it most closely matches.
 *
 * We match to the nearest label _below_ the current screen width. For
 * example, if the screen width is between `md` and `lg` then we match on `md`.
 *
 * @returns the screen width label.
 */
export const useScreenWidth = (): ScreenWidthLabel => {
  const { width } = useWindowDimensions();

  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  if (width >= breakpoints.sm) return "sm";

  return "xs";
};

/**
 * An individual style object applied to a `View`, `Text`, `Image` etc.
 */
type Style = ViewStyle | TextStyle | ImageStyle;

/**
 * The styles object created by `StyleSheet.create`. We use a generic `Name` to
 * enforce the same key names when using `useResponsiveStyles`.
 */
type Styles<Name extends string> = Record<Name, Style>;

/**
 * The input param type for `useResponsiveStyles`. At minimum `xs` and `sm` are
 * required for responsive behaviour.
 */
type StylesMap<Name extends string> =
  | {
      xs: Styles<Name>;
      sm: Styles<Name>;
      md?: never;
      lg?: never;
      xl?: never;
    }
  | {
      xs: Styles<Name>;
      sm: Styles<Name>;
      md: Styles<Name>;
      lg?: never;
      xl?: never;
    }
  | {
      xs: Styles<Name>;
      sm: Styles<Name>;
      md: Styles<Name>;
      lg: Styles<Name>;
      xl?: never;
    }
  | {
      xs: Styles<Name>;
      sm: Styles<Name>;
      md: Styles<Name>;
      lg: Styles<Name>;
      xl: Styles<Name>;
    };

/**
 * Returns the styles for the current screen width.
 *
 * @param stylesMap a map of styles for each screen width.
 *
 * @returns the styles for the current screen width.
 *
 * @remarks
 *
 * Both `xs` and `sm` are required. If there are no distinct styles for `sm` or
 * above then this hook is not required. Just define static styles.
 */
export const useResponsiveStyles = <Name extends string>(
  stylesMap: StylesMap<Name>
) => {
  const screenWidth = useScreenWidth();

  const stylesMap_ = {
    xs: stylesMap.xs,
    sm: stylesMap.sm,
    md: stylesMap.md ?? stylesMap.sm,
    lg: stylesMap.lg ?? stylesMap.md ?? stylesMap.sm,
    xl: stylesMap.xl ?? stylesMap.lg ?? stylesMap.md ?? stylesMap.sm,
  };

  return stylesMap_[screenWidth];
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
