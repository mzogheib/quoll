import { StyleSheet } from "react-native";

const radius = 12;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "red",
    padding: 5,
    height: radius * 2,
    width: radius * 2,
    borderRadius: radius,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
