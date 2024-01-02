import { StyleSheet } from "react-native";
import { colorPalette } from "@quoll/ui-primitives";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    backgroundColor: colorPalette.matterhorn,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colorPalette.mediumAquamarine,
    fontSize: 20,
    fontWeight: "500",
  },
});

export default styles;
