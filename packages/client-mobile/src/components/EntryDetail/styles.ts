import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: "white",
    maxWidth: 360,
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
  content: {
    marginBlockStart: 15,
  },
});

export default styles;
