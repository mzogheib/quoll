import React, { ReactNode } from "react";
import { View } from "react-native";
import styles from "./styles";

const alignMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
} as const;

type Align = keyof typeof alignMap;

const directionMap = {
  row: "row",
  "row-reverse": "row-reverse",
  column: "column",
  "column-reverse": "column-reverse",
} as const;

type Direction = keyof typeof directionMap;

type Props = {
  /** Flex alignment for the children */
  align?: Align;
  /** Flex direction for the children */
  direction?: Direction;
  children: ReactNode;
};

export const ModalActions = ({
  align = "end",
  direction = "row",
  children,
}: Props) => (
  <View
    style={[
      styles.actions,
      {
        flexDirection: directionMap[direction],
        justifyContent: alignMap[align],
      },
    ]}
  >
    {children}
  </View>
);
