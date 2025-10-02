import { StyleSheet } from "react-native";

const WRAPPER_WIDTH = 420;

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: "white",
    maxWidth: WRAPPER_WIDTH,
    borderRadius: 4,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    marginBlockStart: 15,
  },
  description: {
    maxWidth: WRAPPER_WIDTH - 100,
  },
  navigateAction: {
    justifyContent: "center",
  },
});

export default styles;
