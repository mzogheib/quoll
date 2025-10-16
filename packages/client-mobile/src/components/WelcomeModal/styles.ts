import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // TODO: move these to a separate modal component
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(196, 196, 196, 0.5)",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    padding: 40,
  },
  content: {
    backgroundColor: "white",
    width: "100%",
    maxWidth: 400,
    borderRadius: 4,
  },

  header: {
    alignItems: "flex-end",
    padding: 10,
  },
  title: {
    alignItems: "center",
  },
  message: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  actions: {
    padding: 20,
    gap: 10,
  },
});

export default styles;
