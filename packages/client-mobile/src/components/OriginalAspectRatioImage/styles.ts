import { StyleSheet } from "react-native";

const styles = (
  height: number | undefined,
  width: number | undefined,
  imageWidth: number | undefined,
  aspectRatio: number | undefined,
) =>
  StyleSheet.create({
    container: { height, width: width ?? imageWidth, aspectRatio },
  });

export default styles;
