import { StyleSheet } from "react-native";
import { useMemo } from "react";

import { Props } from "./types";

const useStyles = ({ size, color }: Props) => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      wrapper: {
        fontSize: size,
        color,
        fontFamily: "Pacifico-Regular",
      },
    });
  }, [size, color]);

  return styles;
};

export default useStyles;
