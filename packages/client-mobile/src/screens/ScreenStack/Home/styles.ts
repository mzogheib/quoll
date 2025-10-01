import { StyleSheet } from "react-native";

import { useResponsiveStyles } from "@utils/dimensions/logic";

const stylesDefault = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  map: {
    flex: 5,
    position: "relative",
  },
  sideBar: {
    flex: 2,
  },
  entryDetail: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
});

const stylesWide = StyleSheet.create({
  wrapper: {
    flexDirection: "row-reverse",
    flex: 1,
  },
  map: {
    flex: 1,
    position: "relative",
  },
  sideBar: {
    maxWidth: 350,
  },
  entryDetail: stylesDefault.entryDetail,
});

export const useStyles = () =>
  useResponsiveStyles({
    xs: stylesDefault,
    sm: stylesDefault,
    md: stylesDefault,
    lg: stylesWide,
  });
