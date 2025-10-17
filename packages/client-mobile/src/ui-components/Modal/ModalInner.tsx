import React, { ReactNode } from "react";
import { View } from "react-native";

import styles from "./styles";

type Props = {
  children: ReactNode;
};

export const ModalInner = ({ children }: Props) => (
  <View style={styles.inner}>{children}</View>
);
