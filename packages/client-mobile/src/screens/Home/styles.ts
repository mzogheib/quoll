import { StyleSheet } from "react-native";
import { useResponsiveStyles } from "@modules/dimensions/logic";

const stylesDefault = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  sideBar: {},
});

const stylesWide = StyleSheet.create({
  wrapper: {
    flexDirection: "row-reverse",
    flex: 1,
  },
  map: {
    flex: 1,
  },
  sideBar: {
    maxWidth: 300,
  },
});

export const useStyles = () =>
  useResponsiveStyles({
    xs: stylesDefault,
    sm: stylesDefault,
    md: stylesWide,
  });
