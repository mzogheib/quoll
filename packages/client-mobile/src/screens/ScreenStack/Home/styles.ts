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
  entryDetail: {
    position: "absolute",
    top: 0,
    left: "5%",
    zIndex: 99,
    marginBlockStart: 20,
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
  entryDetail: stylesDefault.entryDetail,
});

export const useStyles = () =>
  useResponsiveStyles({
    xs: stylesDefault,
    sm: stylesDefault,
    md: stylesDefault,
    lg: stylesWide,
  });
