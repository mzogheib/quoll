import { StyleSheet } from "react-native";
import { useResponsiveStyles } from "@modules/dimensions/logic";

const stylesDefault = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column-reverse",
  },
});

const stylesWide = StyleSheet.create({
  ...stylesDefault,
  wrapper: {
    flex: 1,
    flexDirection: "row",
  },
});

export const useStyles = () =>
  useResponsiveStyles({
    xs: stylesDefault,
    sm: stylesDefault,
    md: stylesWide,
  });
