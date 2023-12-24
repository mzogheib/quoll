import { useWindowDimensions } from "react-native";

export const useDimensions = () => {
  const { width } = useWindowDimensions();

  const isNarrow = width <= 768;

  return {
    isNarrow: isNarrow,
  };
};
