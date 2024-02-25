import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  logo: {
    width: 25,
  },
  time: {
    flexBasis: 75,
    textAlign: "right",
  },
  image: {
    flexBasis: 70,
    textAlign: "center",
  },
  label: {
    flexGrow: 1,
    overflow: "hidden",
  },
  value: {
    marginLeft: 5,
  },
});

export default styles;
