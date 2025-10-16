import { StyleSheet } from "react-native";
import { lighten, darken } from "polished";
import { colorPalette } from "@quoll/ui-primitives";

import { ButtonVariant } from "./types";

const variantBgColorMap = {
  default: colorPalette.whiteSmoke,
  primary: colorPalette.mediumAquamarine,
  plain: colorPalette.transparent,
} as const;

export const makeStyles = (variant: ButtonVariant, disabled: boolean) => {
  const bgColor = variantBgColorMap[variant];
  const fontWeight = variant === "plain" ? "500" : undefined;
  const noHitbox = variant === "plain";

  return StyleSheet.create({
    base: {
      borderRadius: 4,

      minHeight: noHitbox ? undefined : 36,
      minWidth: noHitbox ? undefined : 120,
      paddingVertical: 0,
      paddingHorizontal: noHitbox ? undefined : 15,

      alignItems: "center",
      justifyContent: "center",

      backgroundColor: disabled ? lighten(0.1, bgColor) : bgColor,
    },
    pressed: {
      backgroundColor: darken(0.05, bgColor),
    },
    buttonText: {
      fontSize: 16,
      fontWeight,
      color: disabled ? "#999999" : "#000000",
    },
  });
};
