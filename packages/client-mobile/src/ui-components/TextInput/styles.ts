import { StyleSheet } from "react-native";
import { colorPalette } from "@quoll/ui-primitives";

export const styles = StyleSheet.create({
  base: {
    fontSize: 14,
    color: colorPalette.black,
    borderColor: colorPalette.grey,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    width: "100%",
  },
});
