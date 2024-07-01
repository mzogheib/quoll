import { StyleSheet } from "react-native";
import { colorPalette } from "@quoll/ui-primitives";

const radius = 12;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colorPalette.red,
    padding: 5,
    height: radius * 2,
    width: radius * 2,
    borderRadius: radius,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colorPalette.white,
  },
});

export default styles;
