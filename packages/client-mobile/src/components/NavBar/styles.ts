import { StyleSheet } from "react-native";
import { colorPalette } from "@quoll/ui-primitives";

const styles = StyleSheet.create({
  // Horizontal layout
  wrapperH: {
    backgroundColor: colorPalette.mineShaft,
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
  },
  itemH: {
    width: 60,
  },

  // Vertical layout
  wrapperV: {
    backgroundColor: colorPalette.mineShaft,
    flexDirection: "column",
    justifyContent: "space-between",
    width: 100,
    paddingVertical: 10,
  },
  itemV: {
    marginTop: 20,
    height: 50,
  },
  logo: {
    color: colorPalette.mediumAquamarine,
    textAlign: "center",
    fontSize: 26,
    marginBottom: 20,
  },
});

export default styles;
