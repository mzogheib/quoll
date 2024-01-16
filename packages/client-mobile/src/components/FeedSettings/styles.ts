import { colorPalette } from "@quoll/ui-primitives";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colorPalette.white,
    borderRadius: 8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});

export default styles;
