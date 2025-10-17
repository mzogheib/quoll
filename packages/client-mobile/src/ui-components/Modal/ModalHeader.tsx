import React, { ReactNode } from "react";
import { View } from "react-native";

import styles from "./styles";

import TouchableIcon from "@components/TouchableIcon";

// Must have at least one prop
type Props =
  | {
      children: ReactNode;
      onClose: () => void;
    }
  | {
      children: ReactNode;
    }
  | {
      onClose: () => void;
    };

export const ModalHeader = (props: Props) => {
  const children = "children" in props ? props.children : null;
  const onClose = "onClose" in props ? props.onClose : null;

  return (
    <View style={styles.header}>
      {children}
      <View />
      {onClose && <TouchableIcon name="close" onPress={onClose} />}
    </View>
  );
};
