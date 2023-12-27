import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapperNarrow: {
    flex: 1,
  },
  wrapperWide: {
    flexDirection: "row-reverse",
    flex: 1,
  },
  map: {
    flex: 1,
  },
  sideBarNarrow: {},
  sideBarWide: {
    maxWidth: 300,
  },
});

export default styles;
