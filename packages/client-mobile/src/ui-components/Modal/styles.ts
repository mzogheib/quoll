import { colorPalette } from "@quoll/ui-primitives";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(196, 196, 196, 0.5)",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  base: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: colorPalette.white,
    borderRadius: 4,
    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inner: {
    padding: 20,
  },
  actions: {
    gap: 10,
    marginTop: 15,
  },
});

export default styles;
