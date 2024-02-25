import { StyleSheet } from "react-native";

import { useResponsiveStyles } from "@utils/dimensions/logic";

const stylesDefault = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  map: {
    flex: 5,
  },
  sideBar: {
    flex: 2,
  },
  timeline: {
    overflow: "scroll",
  },
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
    maxWidth: 350,
  },
  timeline: {},
});

export const useStyles = () =>
  useResponsiveStyles({
    xs: stylesDefault,
    sm: stylesDefault,
    md: stylesDefault,
    lg: stylesWide,
  });
