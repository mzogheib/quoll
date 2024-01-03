import { StyleSheet } from "react-native";
import { colorPalette } from "@quoll/ui-primitives";

const styles = StyleSheet.create({
  // Horizontal layout
  wrapperH: {
    backgroundColor: colorPalette.mineShaft,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itemH: {
    minHeight: 50,
    justifyContent: "center",
  },

  // Vertical layout
  wrapperV: {
    backgroundColor: colorPalette.mineShaft,
    flexDirection: "column",
    justifyContent: "space-between",
    minWidth: 100,
  },
  itemV: {
    marginTop: 20,
    minHeight: 50,
    alignItems: "center",
  },
  logo: {
    color: colorPalette.mediumAquamarine,
    textAlign: "center",
    fontSize: 26,
    marginBottom: 20,
  },
});

export default styles;
