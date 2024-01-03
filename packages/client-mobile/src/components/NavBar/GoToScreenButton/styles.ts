import { StyleSheet } from "react-native";
import { colorPalette } from "@quoll/ui-primitives";

const focusHighlightThickness = 5;

const styles = StyleSheet.create({
  wrapperVFocussed: {
    paddingBottom: focusHighlightThickness,
    borderTopWidth: focusHighlightThickness,
    borderTopColor: colorPalette.mediumAquamarine,
  },

  wrapperHFocussed: {
    marginStart: focusHighlightThickness,
    borderEndWidth: focusHighlightThickness,
    borderEndColor: colorPalette.mediumAquamarine,
  },
});

export default styles;
