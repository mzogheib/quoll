import { StyleSheet } from "react-native";
import { colorPalette } from "@quoll/ui-primitives";

const focusHighlightThickness = 5;

const styles = StyleSheet.create({
  wrapperBlockStartFocussed: {
    paddingBottom: focusHighlightThickness,
    borderTopWidth: focusHighlightThickness,
    borderTopColor: colorPalette.mediumAquamarine,
  },

  wrapperInlineEndFocussed: {
    marginLeft: focusHighlightThickness,
    borderRightWidth: focusHighlightThickness,
    borderRightColor: colorPalette.mediumAquamarine,
  },
});

export default styles;
